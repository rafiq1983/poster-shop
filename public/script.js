
new Vue({
   el:"#app",
   data:{
    total:0,
    products:[       
        {title:"Product 1",id:1, price:9.99},
        {title:"Product 2",id:2,price:9.99},
        {title:"Product 3",id:3,price:9.99}
    ],

cart:[


]
   },

   filters:{

Currency:function(price){

return "$".concat(price.toFixed(2));

}



   },


   methods:{

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
