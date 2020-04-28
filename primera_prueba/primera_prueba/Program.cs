using System;
using System.Collections;
using System.Threading;

namespace ProducerFirst
{
    class Program
    {
        private static Queue buffer = new Queue();
        private static Semaphore mutex, fillCount, emptyCount;
        public static void Main(string[] args)
        {
            int BUFFER_SIZE = 3;
            mutex = new Semaphore(1, 1);
            fillCount = new Semaphore(0, BUFFER_SIZE);
            emptyCount = new Semaphore(BUFFER_SIZE, BUFFER_SIZE);


            Thread p = new Thread(Producer);
            Thread c = new Thread(Consumer);
            p.Start();
            c.Start();
        }

        private static void Producer()
        {
            while (true)
            {
                int item = new Random().Next(0, 100);
                emptyCount.WaitOne();
                mutex.WaitOne();
                buffer.Enqueue(item);
                Console.WriteLine("Objeto insertado.");
                mutex.Release();
                fillCount.Release();
                Console.ReadKey();
            }
        }

        private static void Consumer()
        {
            while (true)
            {
                fillCount.WaitOne();
                mutex.WaitOne();
                Object item = buffer.Dequeue();
                Console.WriteLine("Objeto quitado.");
                mutex.Release();
                emptyCount.Release();
                Console.ReadKey();
            }
        }
    }
}
