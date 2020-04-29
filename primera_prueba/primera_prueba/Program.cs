using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading;

namespace ProducerFirst
{
    class Program
    {
        //SEÑALES IMPORTANTES
        private static Queue buffer = new Queue();
        private static int BUFFER_SIZE = 10;
        private static Semaphore mutex, fillCount, emptyCount, prod_act, cons_act;
        public static void Main(string[] args)
        {
            // Algunos valores importantes 
            int productores = Int32.Parse(args[0]);
            int consumidores = Int32.Parse(args[1]);
            List<Thread> threads = new List<Thread>();
            List<Thread> threadsc = new List<Thread>();

            // Semáforos de control para la cola 
            mutex = new Semaphore(1, 1);
            fillCount = new Semaphore(0, BUFFER_SIZE);
            emptyCount = new Semaphore(BUFFER_SIZE, BUFFER_SIZE);

            //prueba
            prod_act = new Semaphore(1,1);


            // COMIENZO 
            Mostrar();

            // Iniciar la cantidad de productores 
            for(int i = 0; i < productores; i++){
                threads.Add(new Thread(Producer));
                threads[i].Start();
            }

            // Prueba para los consumidores, todavia no se en que parte se controla esto 
            for(int i = 0; i < consumidores; i++){
                threadsc.Add(new Thread(Consumer));
                threadsc[i].Start();
            }

            //read key 
            Thread actualizar = new Thread(Update);
            //actualizar.IsBackground = true;
            actualizar.Start();
        }

        private static void Producer()
        {
            while (true)
            {
                int item = new Random().Next(0, 100);
                emptyCount.WaitOne();
                //prod_act.WaitOne();
                mutex.WaitOne();
                buffer.Enqueue(item);
                Console.Clear();
                Mostrar();
                Thread.Sleep(200);
                mutex.Release();
                //prod_act.Release();
                fillCount.Release();
            }
        }

    private static void Consumer()
        {
            while (true)
            {
                fillCount.WaitOne();
                mutex.WaitOne();
                Object item = buffer.Dequeue();
                Console.Clear();
                Mostrar();
                Thread.Sleep(200);
                mutex.Release();
                emptyCount.Release();
            }
        }

        private static void Mostrar(){
            foreach(int elemento in buffer){
                Console.Write(elemento.ToString() + " ");
            }
            Console.Write("\n");
        }

        private static void StopProd(){
            prod_act.WaitOne();
        }

        private static void ContinueProd(){
            prod_act.Release();
        }

        private static void Update(){
            while(true){
                Console.WriteLine("");
                if(Console.ReadKey().Key.ToString().Equals("P")){
                    StopProd();
                }else if(Console.ReadKey().Key.ToString().Equals("R")){
                    ContinueProd();
                }
                Console.Clear();
            }
        }
    }
}
