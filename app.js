new Vue({
    el:'#app',
    data(){
        return {
            playerHealth: 100,
            monsterHealth: 100,
            gameIsRunning: false,
            turns:[]
        }
    },
    methods:{
        startGame() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        attack(){
            //var damage=Math.max(Math.floor(Math.random()*max)+1,min);
            let damage=this.calculateDemage(3,10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer:true,
                text:'Player hits Monster for '+ damage
            })
            if(this.checkWin()){
                return;
            }
            this.monsterAttack();
        },
        specialAttack(){
            let damage=this.calculateDemage(10,20);
            this.monsterHealth -= damage;
            if(this.checkWin()){
                return;
            }
            this.turns.unshift({
                isPlayer:true,
                text:'Player hits Monster hard for '+ damage
            }),
            this.monsterAttack();
        },
        heal(){
            if(this.playerHealth <=90){
                this.playerHealth +=10;
            }else{
             this.playerHealth=100;
            }  this.turns.unshift({
                isPlayer:true,
                text:'Player heals for 10'
            })
            this.monsterAttack();
        },
        giveUp() {
            this.gameIsRunning = false;
            this.turns= [];
        },
        monsterAttack(){
            damage= this.calculateDemage(5,12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer:false,
                text:'Monster hits player for '+ damage
            })
        },
        calculateDemage(min,max){
          return Math.floor(Math.random()*(max - min +1 ) + min);
        },
        checkWin(){
            if(this.monsterHealth <= 0){
                if(confirm('You won.New Game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                 return true;
            }else if(this.playerHealth<=0){
                if(confirm('You lost.New Game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                } return true;
            }

        }
    }
});