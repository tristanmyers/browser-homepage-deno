![Screenshot 2023-01-12 at 15-58-03 Tees Homepage](https://user-images.githubusercontent.com/20936551/212179926-4e0b9ab1-a106-4e69-9c70-1c3c14964cb8.png)

# Key features

- RSS Reader
- A list of links I use often
- Server side generated
- No javascript on the client for essential stuff (currently there is no JS at
  all but may come in the future with filters for the blogs.)

# On the server side,

The server accesses a SQLITE database with blog links and common links under my
user. For the blogs, I have a caching system so that I don't query the blogs
everytime I go to the web page which is often throughout the day.

Especially since these are blogs are from individuals who are trying to be
resourceful with bandwidth. So I have a value in the database for when the blogs
were last updated.

The server checks the last updated time, if it has been 5 days or more, send a
get request to each blog rss feed (loops through each link in the database) then
cache the xml file.

Then read from the cache directory, creating an array of blog objects that
contain data like, title, description, blog link and post link, then send it to
the client.

I needed a way to refer to the blog url via the file. So I encoded the cached
file names because urls are not good file names, due to symbols and can be too
long.

# Some odd things

When the server is ran for the first time on whatever machine it's on. The
database is initalized with default values for my user from a typescript file.
This is because I am the only one that will be using the website and this would
make it easier for me to test and move servers.

# Things I would like to add

- Filters for the blogs
- Better design
- Way to add new links
