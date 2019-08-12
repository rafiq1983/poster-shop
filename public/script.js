
var LOAD_NUM = 4;
var watcher;
new Vue({
   el:"#app",
   data:{
    total:0,
    search:"cat",
    products:[],
    results:[],                
cart:[],
lastSearch:"",
loading:false
},

updated:function(){
//setTimeout(function()
//{

var t = document.querySelector("#products1");
 watcher = scrollMonitor.create(t);
console.log(watcher);
watcher.enterViewport(this. appendResults);
//},1000)

},

beforeUpdate:function()
{

if(watcher)
{
watcher.destroy();
watcher=null;

}

},

created:function()
{
this.OnSubmit();
},

   filters:{

Currency:function(price){

return "$".concat(price.toFixed(2));

}



   },


   methods:{

      appendResults:function()
      {
         if (this.products.length < this.results.length)
         {
              var append= this.results.slice(this.products.length,this.products.length + LOAD_NUM);
              this.products=this.products.concat(append);

         }


      },

addToCart: function(product) {
    var added=false;
    for (var i=0; i < this.cart.length; i++)
            {
              if (this.cart[i].id===product.id)
              {
                    var p=this.cart[i];
                    p.qty+=1;
                    added=true;
              }      
            }
        
     if (added==false)
     {
         this.cart.push(
             {
            id:product.id,
            title:product.title,
            price:product.price,
            qty:1
            })
        
     }
     this.total+=product.price;


 },

 OnSubmit:function()
 {
this.loading=true;
this.products=[];
var path="/search?q=".concat(this.search);
this.$http.get(path).then(function(response){
setTimeout(function()
{

   this.results=response.body;
   this.appendResults();
   this.lastSearch=this.search;
   this.loading=false;

}.bind(this),300);

});

 },

 inc:function(item){

    this.total+=item.price;
    item.qty++;

 },

 dec:function(item)
 {

this.total-=item.price;
item.qty--;

if (item.qty <=0)
{

   var i=this.cart.indexOf(item); 
   this.cart.splice(i,1)

}

 }

}

});



