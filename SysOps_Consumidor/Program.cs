using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Script.Serialization;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Runtime.InteropServices;
using System.Threading;
using System.Deployment.Internal;

namespace SysOps_Consumidor
{
    class Program
    {
        private static bool finishedInsertion = false;
        private static bool finishedGeneratingFilms = false;
        private static string currentJSON = null;
        private static string currentID = null;
        private static Actress currentActress = null;
        private static Film currentFilm = null;
        private static List<Film> films_list = new List<Film>();
        private static BD conn = new BD();

        private static Thread getItem;
        private static Thread insert;

        static void Main(string[] args)
        {
            //GetItemFromWorker();
            //getItem();
            //Console.ReadLine();
            Console.CancelKeyPress += new ConsoleCancelEventHandler(myHandler);
            //currentID = "5eb93328d1be74b11b4338c5";
            //deleteFromQueue();
            //Console.ReadLine();
            getItem = new Thread(GetItemFromWorker);
            insert = new Thread(InsertToDatabase);

            //getItem2();
            //Console.ReadLine();
            getItem.Start();
            insert.Start();
            /*
            var jsonTest = @"{
                                ""_id"": ""5eb93327d1be74b11b4338c4"",
                                ""result"": {
                                            ""Letra"": ""F"",
                                            ""Name"": ""Shelley Fabares"",
                                            ""Role"": ""Actress, singer"",
                                            ""films"": [
                                                [
                                                    ""https://en.wikipedia.org/wiki/Primetime_Emmy_Award_for_Outstanding_Supporting_Actress_%E2%80%93_Comedy_Series"",
                                                    ""Outstanding Supporting Actress in a Comedy Series""
                                                ],
                                                [
                                                    ""https://en.wikipedia.org/wiki/TV_Land_Award"",
                                                    ""TV Land Award""
                                                ],
                                                [
                                                    ""https://en.wikipedia.org/wiki/Young_Artist_Award"",
                                                    ""Young Artist Award""
                                                ]
                                            ],
                                            ""url"": ""https://en.wikipedia.org/wiki/Shelley_Fabares""
                                        }
                            }";
            dynamic json = new JavaScriptSerializer().Deserialize<dynamic>(jsonTest);
            Console.WriteLine(json["_id"]);
            Console.WriteLine(json["result"]["Letra"]);
            Console.ReadLine();
            */
        }

        private static async void deleteFromQueue()
        {
            //currentID = "5eb9332ad1be74b11b4338c6";
            string sURL = "/borraUno/";
            string delete = @"{""id"": ""++"" }";
            string jsondel = @"{""id"": """+currentID+@"""}";
            string finalURL = sURL + jsondel;
            Console.WriteLine(finalURL);

            HttpClient client = new HttpClient();            
            HttpRequestMessage request = new HttpRequestMessage
            {
                Content = new StringContent(jsondel, Encoding.UTF8, "application/json"),
                Method = HttpMethod.Delete,
                RequestUri = new Uri("http://listener2020.herokuapp.com/borraUno/")
            };
            
            await client.SendAsync(request);
            Console.WriteLine("Deleted from Queue");


        }      

        private static void InsertToDatabase()
        {
            Console.WriteLine("Insert function initiated");
            while (true)
            {
                Thread.Sleep(3000);
                finishedInsertion = false;
                if (currentID != null)
                {
                    deleteFromQueue();
                }
                
                if (currentActress != null && finishedGeneratingFilms == true)
                {                    
                    Console.WriteLine("Can insert");
                    finishedInsertion = false;

                    string insertActressQuery = $"INSERT INTO Actress (actress_name, actress_role, actress_url, letter, id_consumidor) " +
                                $"VALUES ('{currentActress.name}', '{currentActress.role}', '{currentActress.url}', '{currentActress.letter}', '{currentActress.idConsumidor}')";
                    Console.WriteLine(insertActressQuery);
                    conn.Insert(insertActressQuery);


                    foreach (Film film in films_list)
                    {
                        currentFilm = film;

                        string insertFilmQuery = $"INSERT INTO Films (movie_name, movie_url, id_consumidor) " +
                                $"VALUES ('{currentFilm.name}', '{currentFilm.url}', '{currentFilm.idConsumidor}')";
                        Console.WriteLine(insertFilmQuery);
                        conn.Insert(insertFilmQuery);

                        string insertBothQuery = $"INSERT INTO Actress_Filmography(actress_id, film_id) " +
                                $"SELECT a.id, f.id " +
                                $"FROM Actress as a, Films as f " +
                                $"WHERE a.actress_name = '{currentActress.name}' and f.movie_name = '{currentFilm.name}'";
                        Console.WriteLine(insertBothQuery);
                        conn.Insert(insertBothQuery);

                        Thread.Sleep(250);
                    }
                    films_list = new List<Film>();

                    currentActress = null;
                    currentFilm = null;
                    currentID = null;
                    finishedInsertion = true;

                }
                else
                {
                    Console.WriteLine("Pending objects to insert");
                    Thread.Sleep(3000);
                }
            }
            
        }

        private static async void GetItemFromWorker()
        {
            //Go to API and request the Worker for 1 element in Queue       
            Console.WriteLine("GetItem function initiated");
            HttpClient client = new HttpClient();
            Console.WriteLine("Client created");
            client.BaseAddress = new Uri("http://listener2020.herokuapp.com");
            while (true)
            {
                Thread.Sleep(10000);
                if (currentActress == null && currentFilm == null)
                {
                                      
                    HttpResponseMessage response = await client.GetAsync("/colaUno/");
                    if (response.IsSuccessStatusCode)
                    {
                        //json = await response.Content.ReadAsAsync<FullObject>();
                        currentJSON = await response.Content.ReadAsStringAsync();
                        //Console.WriteLine(currentJSON);
                        Console.WriteLine("Object received from API");
                    }
                    else
                    {
                        Console.WriteLine("Could not get element from the queue");
                        currentJSON = null;
                    }
                    /*
                    currentJSON = @"{
	                                ""url"": ""https://en.wikipedia.org/wiki/Diahnne_Abbott"",
                                    ""Name"": ""Diahnne Abbott"",
	                                ""Role"": ""Actress, singer"",
	                                ""Letra"": ""A"",
	                                ""films"": [
                                        [
			                                ""https://en.wikipedia.org/wiki/Taxi_Driver"",
			                                ""Taxi Driver""
		                                ],
		                                [
			                                ""https://en.wikipedia.org/wiki/Welcome_to_L.A."",
			                                ""Welcome to L.A""	
		                                ],
		                                [
			                                ""https://en.wikipedia.org/wiki/New_York, _New_York_(1977_film)"",
			                                ""New York, New York""	
		                                ],
		                                [
			                                ""https://en.wikipedia.org/wiki/The_King_of_Comedy_(film)"",
			                                ""The King of Comedy""
		                                ]
	                                ]
                                }";
                    */

                    try
                    {
                        dynamic json = new JavaScriptSerializer().Deserialize<dynamic>(currentJSON);
                        currentID = json["_id"];
                        try
                        {
                            var films = json["result"]["films"];


                            //Console.WriteLine(currentID);
                            // ---------------------------------------------------------- //
                            /*   Create the currentActress object then insert to the DB   */
                            currentActress = new Actress();
                            currentActress.url = json["result"]["url"];
                            currentActress.name = json["result"]["Name"];
                            currentActress.role = json["result"]["Role"];
                            currentActress.letter = json["result"]["Letra"];
                            //currentActress.idConsumidor = ?

                            //Insert to the DB
                            //InsertToDatabase("actress");


                            // ---------------------------------------------------------- //

                            // ---------------------------------------------------------- //
                            /*   Read the entire array of Films and insert them separately in the DB   */
                            finishedGeneratingFilms = false;
                            foreach (var movie in films)
                            {

                                //Check every movie in the array
                                //  Movie[0] = The url of the movie
                                //  Movie[1] = The name of the movie
                                Film film = new Film();
                                film.name = movie[1];
                                film.url = movie[0];
                                films_list.Add(film);

                                //InsertToDatabase("film");

                                //Insert into Actress_Filmography DB
                                //InsertToDatabase("both");
                            }
                            finishedGeneratingFilms = true;

                            //Console.ReadLine();
                        }
                        catch (Exception ex)
                        {
                            deleteFromQueue();
                        }
                    }catch(Exception ex)
                    {
                        Console.WriteLine("Empty Queue");

                    }
                    


                }
                else
                {
                    Console.WriteLine("Can't get from API. Consumer is busy.");
                }
            }
            
        }

        protected static void myHandler(object sender, ConsoleCancelEventArgs args)
        {
            getItem.Abort();
            

            Console.WriteLine("Program Aborted");
            
            int cont = 0;
            while (!finishedInsertion)
            {                
                Console.WriteLine("Pending insertion to DB");
                Thread.Sleep(250);
                cont += 1;
                if(cont > 200)
                {
                    finishedInsertion = true;
                }
            }
            if (finishedInsertion)
            {
                Console.WriteLine("Finished insertion. Program will safely exit now");
                conn.Close();
            }
            

            Environment.Exit(0);
        }
    }
}
