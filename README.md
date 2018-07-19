# Moodsic!
WDI Seattle project 3!


###########

(Rough outline of READ ME)

Moodsic

Moodsic allows you to create personalized playlist based on your mood, by uploading a photo to your profile.

View the live site at http…….

Developers:
	Jay Hathaway
	Kacy Sommers
	Genevieve Shultz
	Eva Barrett

About the App

How to use Moodsic:
Start by clicking “Sign Up” on the homepage and creating a user profile.   

User Stories:  (****rough draft user stories*****)
Sam has a busy work and personal life and enjoys all types of music. Since he is always on the go he needs a way to be able to open an app and get a list of songs playing without any time wasted. With his love for all genres of music, Moodsic will allow him to quickly select his generated playlist and get back to what he’s doing. 
Derrick likes to call himself a musician and enjoys inspiration. One way he gets his ideas is to listen to new artists. Not knowing what all is out there with Moodsic he will be able to get random categorized playlists for him to enjoy. He is able to select the genre to make it more customized for what type of music he is in the mood for.
Megan likes social media and the latest apps that allow her to express herself and enjoy life. She likes to upload photos of her daily adventures. With Moodsic she will not only get to upload her favorite photos but have some music to go along with what she is doing. The app will allow her to share with friends and stay connected.
Tammy …..
Under the Hood

Key Technologies Used:
React
React Router
MongoDB
Mongoose
Material UI


Project Timeline

Planning
-Shared app Ideas
-Researched usable API’s
-finalized out selection to Spotify and Cloudinary API
-agreed to use Trello Board
-agreed to use wire framing

Building Phase



Testing/Debugging:

Organization
We used a trello board to keep track of tasks.

Wire Frames

(Add photos and labels)


Routes

## auth routes
| Method | Path						|
| -------| ------------------------ | 
| POST 	 | /auth/me/from/token 		|
| POST 	 | /auth/login				|
| GET 	 | /auth/logout				|
| GET 	 | /auth/get/spotify/token	|

## playlist routes
| Method | Path						|
| -------| ------------------------	|
| POST 	 | /playlist				|
| GET 	 | /playlist/user/:userId	|
| PUT 	 | /playlist/:id			|
| DELETE | /playlist/:id			|


 

Next Steps and Future Improvements
