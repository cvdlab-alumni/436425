CG - Final Project
==============
Stefano Russo - 436425
------------------------------
---

### Code organization

Main page [index.html] (index.html) imports all required libs and js code. The code is separated in different files ("scripts" folder) as described below:

* [Animations.js] (scripts/Animations.js): Tween animations used by other objects, lights and effects.
* [Apartment.js] (scripts/Apartment.js): main apartment objects, like base and roof.
* [Apartment-Doors.js] (scripts/Apartment-Doors.js): function to build doors (object and interaction) and corresponding doors definitions.
* [Apartment-Walls.js] (scripts/Apartment-Walls.js): functions to make wallpapers and to change texture dynamically, with corresponding walls/wallpapers definitions.
* [Apartment-Windows.js] (scripts/Apartment-Windows.js): function to build windows (object and interaction) and corresponding windows definitions.
* [ControlGUI.js] (scripts/ControlGUI.js): manage [dat.gui] (https://code.google.com/p/dat-gui/) interface.
* [FirstPersonControls.js] (scripts/FirstPersonControls.js): manage "First Person mode" and mouse pointerlock.
* [Forniture.js] (scripts/Forniture.js): functions to import and edit OBJ/MTL, along with all forniture objects definitions.
* [GlobalFunctions.js] (scripts/GlobalFunctions.js): functions needed globally, like event handling, mesh building, rendering and updates.
* [Init.js] (scripts/Init.js): all kind of initializations and settings to enable/disable features that change code portions.
* [Lights.js] (scripts/Lights.js): scene lights, internal (lamp light, TV light, etc.) and external (sun light, hemisphere light).
* [Materials.js] (scripts/Materials.js): materials definitions and textures imports.
* [Particles.js] (scripts/Particles.js): particle systems functions and definitions.
* [Scene.js] (scripts/Scene.js): general scene objects (fog, skybox, avatar, grass).
* [Video-Sounds.js] (scripts/Video-Sounds.js): video and sounds definitions.

As mentioned above, the file [Init.js] (assets/Init.js) contains some settings to change the code behaviour and enable or disable features:

* **textures path** and **models path**
* options to disable **roof**, **doors**, **windows**, **walls**, **forniture**, **lights**

---

### Features
* **Day / night cycle** (day/sunset/night/sunrise, with soft transitions).
* Textures with **diffuse maps**, **normal maps** and **displacement maps** using ShaderMaterial.
* **Dynamic walls textures** (both internal and external).
* Real **light switches** to turn on/off lights in every room.
* **Particles systems** like rain, tap water and stars.
* **Wearable 3D glasses** and 3D effect on laptop screen
* **Mirror** with CubeCamera mapping for reflections.
* **Tween animations** to move objects, animate lights and particles.
* **Skybox** background, whose color changes depending on the time.
* Animated in/out **fog** effect and **fog color** when it's raining.
* **Trackball mode**, along with ...
* ... **first person mode** (pointerlock) with **object picking**.
* **Video texture** on TV and lighting effect.
* Movable **parabolic antenna** with the **effect of signal loss** on TV.
* **Control GUI** to control some features.
* **Sounds** (doors, TV, radio, bathrom) with effect of  **fading out with distance**.