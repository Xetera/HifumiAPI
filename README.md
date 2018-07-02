# Hifumi API
![](https://content.nanobox.io/content/images/2017/06/sailsjs-banner.png)


## Modules

### Image Uploading:

Storing personal images using the uploader API. Currently only for
personal use as validating random images can be very tricky / risky

####  Details:
* User makes a request including their username
* Images are stored in an Amazon S3 Bucket
* All upload data is saved in a postgresql database
* Upload keys are stored alongside their hashid counterparts
* Requests for images by hashids are looked up by their S3 key counterparts
* Content is piped directly to response without saving a copy

<hr>

### Discord-Friendly Image Resizing [Not Implemented]

**Todo**: Quick resizing images to a more discord-friend format to be
used alongsize of [Hifumi's](https://www.github.com/ilocereal/Hifumi)
**$addmacro** command

## TODO

* **Image Processing**
    * Really only going to be used for resizing
* **Message Generation**
    * Markov chains should be used to generate messages that sound
    like other users
    * This will most likely require me to keep track of people's messages
    however I'm hoping that can be done by only saving the state of
    the markov chain instead rather than the messages the API receives.
    The ope problem with that approach could be that it could lead
    to massive single json fields for a user.
* **Bot Stats**
    * Obviously being the Hifumi API, this should support an endpoint
    that lets Hifumi do post request to to keep track of her stats.
    This will be done later when the website is updated

#### This api is still under heavy construction
