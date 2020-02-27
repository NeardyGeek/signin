import React, { Component } from "react";
import app from "../base";
import { useEffect, useState } from "react";
import {
    //BrowserRouter as Router,
    //Switch,
    //Route,
    Link,
    //useRouteMatch
} from "react-router-dom";
import "./Portfolio.css";
//import useInterval from "./useInterval";


const db = app.firestore();
const prefix = "https://cloud.iexapis.com/stable/stock/";
const postfix = "/quote?token=pk_dea1eb58206b464980a892070dc07dad";
var d = new Date();
var h = d.getHours();
var m = d.getMinutes() / 60;
var t = h + m;
//var last = 3000;

const Portfolio = () => {


    var user = app.auth().currentUser;
    var uid, name;
    //var balence = user.balence;
    name = user.displayName
    uid = user.uid;


    db.collection("users").doc(uid).get().then(doc => {
        let txt = "cash- (" + doc.data().balence + ")";
        return txt;
    }).then(txt => {
        var cashRef = document.getElementById("cash");
        cashRef.innerHTML = txt;
    })


    function handleBuy(e) {

        e.preventDefault();
        let ticker = document.getElementById("ticker").value;
        var qty = Number(document.getElementById("qty").value);
        let url = prefix + ticker + postfix;
        //let symbol, currPrice, openPrice;

        if (!Number.isInteger(qty)) {
            alert("share quantities must be whole number");
        }


        fetch(url)
            .then(response => {
                return response.json();
            })
            .then(data => {

                db.collection("users").doc(uid).get().then(doc => {
                    let symbol = data.symbol;
                    let currPrice = data.latestPrice;
                    let totalPrice = currPrice * qty;
                    var balence = doc.data().balence;

                    if (totalPrice > balence) {
                        alert("you don't have enough balence");
                    }
                    balence = balence - totalPrice;
                    return [symbol, currPrice, balence];

                }).then(res => {

                    addToUsers(res[2], res[0], res[1], qty);
                    addToTrans(res[0], res[1], qty);

                }).catch(error => {
                    alert(error);
                });


            }).then(() => {

                db.collection("users").doc(uid).collection("tickers").get()
                    .then(querySnapshot => {


                        querySnapshot.forEach(doc => {
                            console.log(doc.id, doc.data().qty);
                        });


                    })

            })


    }


    function addToUsers(b, symbol, price, qty) {

        var docRef = db.collection("users").doc(uid).collection("tickers").doc(symbol);
        
        docRef.get().then(doc => {
            if (doc.exists) {
                let owns = doc.data().qty;
                let newQty = Number(owns) + Number(qty);
                docRef.set({
                    currPrice: price,
                    qty: newQty
                })

            } else {
                docRef.set({
                    currPrice: price,
                    qty: qty

                })
            }
        }).then(() => {
            db.collection("users").doc(uid).set({
                balence: b
            })
        }).then(() => {
            db.collection("users").doc(uid).collection("tickers").get()
                .then(querySnapshot => {
                    var totalValue = 0;
                    let txt = "<ul>";
                    querySnapshot.forEach(doc => {
                        var value = doc.data().currPrice * doc.data().qty;
                        totalValue = totalValue + value;
                        txt += "<li id = '" + doc.id + "'><font color = 'gray'>" + doc.id + " " + doc.data().qty + " shares $" + value + "</font></li>";
                    });
                    txt += "</ul>"
                    return [txt, totalValue];
                }).then(res => {
                    let txt = "<h1 id = 'totalvalue' value = ' " + res[1] + "'>Portfolio (" + res[1] + ")</h1>";
                    var stocklist = document.getElementById("stockList");
                    stocklist.innerHTML = txt + res[0];

                })

        }).then(() => {
            db.collection("users").doc(uid).get().then(doc => {
                let txt = "cash- (" + doc.data().balence + ")";
                return txt;
            }).then(txt => {
                var cashRef = document.getElementById("cash");
                cashRef.innerHTML = txt;
            })

        })
        .catch(error => {
                console.log(error);
        })


    }

    function addToTrans(symbol, price, qty) {

        db.collection("trans").doc(uid).collection("historys").add({
            buyPrice: price,
            ticker: symbol,
            qty: qty
        }).then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        })
            .catch(function (error) {
                console.error("Error adding document: ", error);
            });

    }



    db.collection("users").doc(uid).collection("tickers").get()
        .then(querySnapshot => {
            var totalValue = 0;
            let txt = "<ul>";
            querySnapshot.forEach(doc => {
                var value = doc.data().currPrice * doc.data().qty;
                totalValue = totalValue + value;
                txt += "<li id = '" + doc.id + "'><font color = 'gray'>" + doc.id + " " + doc.data().qty + " shares $" + value + "</font></li>";
            });
            txt += "</ul>"
            return [txt, totalValue];
        }).then(res => {
            let txt = "<h1 id = 'totalvalue' value = ' " + res[1] + "'>Portfolio (" + res[1] + ")</h1>";
            var stocklist = document.getElementById("stockList");
            stocklist.innerHTML = txt + res[0];

        })



    useEffect(() => {

        

            var interval = setInterval(() => {

                db.collection("users").doc(uid).collection("tickers").get()
                    .then(querySnapshot => {
                       
                        let txt = "";
                        var prevTotal = Number(document.getElementById("totalvalue").getAttribute("value"));

                        querySnapshot.forEach(doc => {
                            let url = prefix + doc.id + postfix;
                            var priceRef = db.collection("tickers").doc(doc.id);
                            fetch(url).then(res => {

                                return res.json();

                            }).then(data => {
                                var open = 0;

                                if(t >= 9.5 && t <= 16 && d !== 0 && d !== 6){
                                    open = data.open;
                                }else{
                                    open = data.previousClose;
                                }

                                var diff = data.latestPrice - open;

                                console.log(diff);

                                if (data.latestPrice > open) {
                                    priceRef.update({
                                        "currPrice": data.latestPrice
                                    }).catch(() => {
                                        console.log("yes");
                                    })
                            
                                    txt += "<font color = 'green'>";

                                } else if (data.latestPrice < open) {
                                    priceRef.update({
                                        "currPrice": data.latestPrice
                                    }).catch(() => {
                                        console.log("yes");
                                    })
                                    
                                    
                                    txt += "<font color = 'red'>";

                                } else {
                                    
                                    txt += "<font color = 'gray'>";
                                }

                                return [txt, diff];

                            }).then((res) => {
                               
                                var value = res[1] * doc.data().qty;
                            
                                var html = res[0];
                                html += doc.id + " " + doc.data().qty + " shares $" + doc.data().currPrice + "</font>";
                                //console.log(res[1]);
                                return [html, value];

                            }).then(res => {

                                var newTotal = prevTotal + res[1];
                                //console.log(prevTotal);
                                document.getElementById('totalvalue').innerHTML = "Portfolio (" + newTotal + ")";
                                document.getElementById(doc.id).innerHTML = res[0];
                                return res[1];

                            }).then((res) => {

                               console.log(res);

                            })
                            .catch(error => {
                                console.log(error);
                            })
                        });

                    });

            }, 10000);

        
        return () => clearInterval(interval);

    }, []);





    return (
        <>
            <div className="header">
                <h1>hello {name} </h1>
            </div>

            <div className="top">
                <Link to="/">Portfolio</Link> | <Link to="/transaction">Transaction</Link>
                <button onClick={() => app.auth().signOut()}>Sign out</button>
            </div>

            <div className="row">
                <div className="column">
                    <h1 id="cash" ></h1>
                    <form onSubmit={handleBuy}>
                        <label>
                            Ticker
            <input id="ticker" type="text" placeholder="Ticker" />
                        </label>
                        <label>
                            Qty
            <input id="qty" type="number" placeholder="qty" />
                        </label>
                        <button type="submit">Buy</button>

                    </form>
                </div>
                <div className="column">
                    <div id="stockList"></div>
                </div>
            </div>
        </>


    );
};

export default Portfolio;


