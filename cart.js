export let cart = JSON.parse(localStorage.getItem("Watchlist")) || [];
if(!cart){
    cart =[
        {id : 1},
        {id : 2}
    ];
}

function savetoStorage(){
    localStorage.setItem("Watchlist",JSON.stringify(cart));
}

export function AddtoWatchlist(hostelId){
    let matched;
    cart.forEach((item)=>{
        if(hostelId===item.id){
            matched=item;
        }
    });
    if(!matched){
    cart.push({
        id : hostelId
    });
    }
    savetoStorage();
    console.log(cart);
}
export function deleteHostel(find){
    const newCart = [];
    cart.forEach((item)=>{
        if(item.id != find){
            newCart.push(item);
        }
    });
    cart=newCart;
    savetoStorage();
}
