var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var feedFoods;
var foodObj;

//create feed and lastFed variable here
var feed;
var lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feedthedog=createButton("Feed Food");
  feedthedog.position(800,200);
  feedthedog.mousePressed(feedFoods);



  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database 
  
 
  //write code to display text lastFed time here

 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  if(lastFed>=12){
  hour(PM);
  }else if(lastFed==0){
  text("Last Feed : 12 AM",350,30);
  }else {
    hour(AM);
  }
}

//function to add food in stock
var food_stock_val = foodObj.getFoodStock();
if(food_stock_val <= 0){
   foodObj.updateFoodStock(food_stock_val *0);
  }else{
   foodObj.updateFoodStock(food_stock_val -1);
  }






function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
