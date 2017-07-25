# GridGame
Grid based Dungeon crawler game

Using vanilla Javascript, this is a grid based game to grab all the treasure in the treasure on the level. The game utilizes using a 2d array to navigate around the grid, replacing images as needed. Each chest requires a key to open, and the exit can only open once all treasure chests have been opened. 

The level is made with a 100 Character string, where:
-S is a starting point. 
-C is a locked chest
-O is an open chest.
-K is a key. 
-E is the exit. 
-W is a wall.
-P is a path. 

the Number of C's must equal the number of K's. E is only accessible once all the chests are opened. A C will become an O once accessed. 

# Future Improvements

Looking to add a dynomite functionality, as well as a dark level, where only the squares around you is visible, and the other squares have a layer of black on top. 

A Dynamite blows up squares around it. Still debating whether the player would take damage, or add in a damage system. 

Auto maze generation is something remotely far from considering, maybe one day such a topic would be understood and implemented. 
