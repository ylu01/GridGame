<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png" />
        <div id="game-board" class="board"></div>
    </div>
</template>

<script>
    import labels from './assets/assets.json';
    import $ from 'jquery';
    export default {
        name: 'App',
        methods: {
            makeBoard: function() {
                const levelStr = labels.level['originalLevel'];
                var gridId;
                console.log(levelStr);
                for (var count = 1; count < 11; count++) {
                    for (var count1 = 1; count1 < 11; count1++) {
                        gridId = count + '-' + count1;
                        this.addToGrid(count - 1, count1 - 1, gridId); //lllll
                    }
                }
            },
            addToGrid(x, y) {
                var level = labels.level['originalLevel'].split('');
                var newArr = [];
                var board = $('#game-board');
                while (level.length) {
                    newArr.push(level.splice(0, 10));
                }
                var curId = x + '-' + y;
                var newGrid = document.createElement('div');
                newGrid.setAttribute('class', 'grid');
                newGrid.setAttribute('id', curId);
                var newImg = document.createElement('img');
                if (newArr[x][y] === 'W') {
                    let image = require('./assets/wall.jpg');
                    newImg.setAttribute('src', image);
                    //newImg.src = './assets/wall.jpg';
                } else if (newArr[x][y] === 'P') {
                    newGrid.style.backgroundColor = 'gray';
                } else if (newArr[x][y] === 'S') {
                    //begX = x;
                    //begY = y;
                    let image = require('./assets/char1.jpg');
                    newImg.setAttribute('src', image);
                } else if (newArr[x][y] === 'C') {
                    let image = require('./assets/chest.jpg');
                    newImg.setAttribute('src', image);
                } else if (newArr[x][y] === 'E') {
                    let image = require('./assets/door.jpg');
                    newImg.setAttribute('src', image);
                } else if (newArr[x][y] === 'O') {
                    let image = require('./assets/openChest.jpg');
                    newImg.setAttribute('src', image);
                } else if (newArr[x][y] === 'K') {
                    let image = require('./assets/wall.jpg');
                    newImg.setAttribute('src', image);
                } else if (newArr[x][y] === 'T') {
                    let image = require('./assets/tnt.png');
                    newImg.setAttribute('src', image);
                } else if (newArr[x][y] === 't') {
                    let image = require('./assets/torch.png');
                    newImg.setAttribute('src', image);
                } else {
                    let image = require('./assets/wall.jpg');
                    newImg.setAttribute('src', image);
                }
                newGrid.append(newImg);
                board.append(newGrid);
            },
        },
        created() {},
        mounted() {
            this.makeBoard();
        },
    };
</script>

<style>
    .board {
        background-color: gray;
        width: 500px;
        height: 500px;
        margin-right: 50px;
        float: left;
    }
    .grid {
        border: 1px solid #000000;
        position: relative;
        width: 100%;
        margin: auto;
        width: 48px;
        height: 48px;
        float: left;
    }
    img {
        height: 100%;
    }
</style>
