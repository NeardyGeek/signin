import React from "react";
import app from "../base";
import {
    
    
    Link
    
  } from "react-router-dom";



const db = app.firestore();
//var user = app.auth().currentUser;
//var uid = user.uid;

const Transaction = () => {

   
    var user = app.auth().currentUser;
    var uid = user.uid;

    db.collection("trans").doc(uid).collection("historys").get()
        .then(querySnapshot => {
            let txt = "<ul>";
            querySnapshot.forEach(doc => {
                txt += "<li>" + doc.data().ticker + " " + doc.data().qty + " shares @ $" + doc.data().buyPrice + "</li>";
            });
            txt += "</ul>"
            return txt;
        }).then(res => {
            var translist = document.getElementById("translist");
            translist.innerHTML = res;
        });

        

        return (
            <>
            <div className = "top">
                <Link to= "/">Portfolio</Link> | <Link to="/transaction">Transaction</Link>
                <button onClick={() => app.auth().signOut()}>Sign out</button>
            </div>
            <div className = "columnt">
              
                <div id = "translist"></div>
            </div>
            </>
          );

}

export default Transaction;