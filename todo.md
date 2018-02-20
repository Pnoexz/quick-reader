v1.0.0
======

Logic
-----
  * [ ] Unify the different speed modifiers
  * [ ] Revisit the speed modifier base on word length
  * [ ] Update state when speed is changed
  * [ ] Fix the on document ready event
  * [ ] Fix bug where changing the text skips the first word
          Somehow nextWord gets called and it moves the state.wordIndex

Controls
--------
  * [ ] Put clearReadport on a timeout because a timeout is already running when the stop control is pressed
  * [x] Add keybindings
    * Pause/Resume (spacebar)
    * Stop (escape?)

UI
--
  * [ ] Add more themes (monokai pls)
  * [ ] Include option to use the [OpenDyslexic](https://opendyslexic.org/) font


v1.1.0
======

Logic
-----
  * [ ] Add waiting on paragraphs
  * [ ] Rewind
    * To last period
    * To last paragraph

Controls
--------
  * [ ] Add control for speed modifier on paragraph
  * [ ] Add rewind controls

UI
--
* Speed controls (+, -)
