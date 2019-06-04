# Advanced Timer using Node-Red

This is an advanced timer using rhasspy and node-red.

## Requirements

This flow relies on the custom node "mytimout by cherry (besides the Home Assistant nodes)

## Description

This timer is based on the excellent example by rhasspy developer Michael Hansen but has a few more features.
- Stop a timer at any time using the StopTimer event (this will cancel a paused timer).
- Pause a timer at any time using the PauseTimer event.
- Resume a paused timer use the ResumeTimer event. 
- Get the current status of an active or paused  timer using the StatusTimer event.

If a timer ends there are several options to indicate this.
You have to connect the "Timer End Status" nodes first output to one of the following nodes: "load audio, Set wavefile url or Done.


This is still a work in progess!

## Files

* `sentences.ini` - grammar for spoken sentences
* `timer-flow.js` - NodeRED flow that interacts with HomeAssistant / Rhasspy

