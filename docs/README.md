---
home: true
# heroImage: /assets/img/logo.png
heroText: Welcome to the official ct.js docs!
tagline: Learn ct.js, complete tutorials, and contribute to ct.js documentation
actions:
    - text: Read the docs →
      link: /ct-concepts.html
      type: primary
footer: Ct.js documentation. Except where otherwise noted, content is licensed under a Creative Commons Attribution 4.0 International License.

highlights:
  - # header: Let's start making great stuff!
    features:
      - title: Learn JavaScript
        details: Games made in ct.js use JavaScript, or simply JS, to code their gameplay logic. Learn the needed part of it in our little <a href="/learn-js/jsintro_pt1.html">Introduction to JavaScript</a>.</p>
        link: ./learn-js/jsintro_pt1.md
      - title: Complete tutorials
        details: <p>The best way to learn is by <i>making</i>, and you can create real games with our step-by-step tutorials:</p>
            <ul>
                <li><a href="/tutorials/making-games-shooter.html">Make a space shooter game →</a></li>
                <li><a href="/tutorials/making-games-platformer.html">Create a platformer →</a></li>
                <li><a href="/tutorials/making-games-jettycat.html">Create Jetty Cat, a flappy-bird-like game →</a></li>
      - title: Learn the core library
        details: <p>See additional methods and properties of copies, camera, and rooms, and procedurally create tilemaps, backgrounds, and new copies.</p>
            <a href="/ct-concepts.html" class="vp-link">Go to ct.js docs →</a>
        link: ./ct-concepts.md
  - header: Get the cheatsheet
    image: /assets/img/CheatsheetThumbnail.png
    description: <p>Available in English, Russian, Spanish and Brazilian Portuguese languages.</p>
        <a class="vp-link vp-hero-action primary" target="_blank" href="https://comigo.itch.io/ct-cheat-sheet">Download the cheatsheet →</a>
  - header: Notable changes and additions in ct.js v4
    features:
      - title: New sound editor and sound engine
        icon: music
        details: These two couple together greatly and let you effortlessly create randomized sounds with no code (except for <code>sounds.play('YourSound')</code>!)
      - title: Base classes for templates
        icon: icons
        details: Now your templates may be based not just on animated sprites but also on nine-slice patches, text labels, dynamic buttons, or empty containers. You can place and edit them as regular copies both in a room editor and in-game. More base classes coming after the v4 release!
      - title: Behaviors
        icon: brain
        details: A new scriptable asset type that you can use to define shared logic for rooms and templates. You can add behaviors to any template or room at any time, and most of the time even add or remove them dynamically!
      - title: Asset folders
        icon: folder
        details: A real file-like project structure with nested folders and one asset browser.
      - title: <code>settings</code> API
        icon: gears
        details: API for in-game change of framerate cap, hi-DPI and scaling mode!
      - title: UI tools for the room editor
        icon: arrow-pointer
        details: Additional tools for base classes plus tools to create flexible UI layouts for various game resolutions.
  - # header: Get help, and help others!
    features:
      - title: Join the Community
        details: <p>Join our Discord server to meet other game developers, receive help, aid others, and share your creations. Alternatively, you can also post on our forum.</p>
            <a class="vp-link vp-hero-action primary" target="_blank" href="https://discord.gg/yuvuDW5">Discord Server →</a>
            <a class="vp-link vp-hero-action primary" target="_blank" href="https://forum.ctjs.rocks/">Forum →</a>
      - title: Contribute
        details: <p>Set up a dev environment to run a local docs server and use simple Markdown syntax to write new tutorials and send fixes.</p>
            <p>You can also edit docs on Github — look for "Propose edits" links at the bottom of each page!</p>
            <a class="vp-link vp-hero-action primary" target="_blank" href="https://github.com/ct-js/docs.ctjs.rocks">Visit the repo →</a>
---
