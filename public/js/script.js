console.log("Hello");

document.querySelector(".menu").addEventListener("click", function(e){
    let sideNav = document.querySelector(".side_nav");
    sideNav.style.display = (sideNav.style.display === "none" || sideNav.style.display === "") ? "flex" : "none";
});

document.querySelector(".close").addEventListener("click", function(e){
    let sideNav = document.querySelector(".side_nav");
    sideNav.style.display = (sideNav.style.display === "none" || sideNav.style.display === "") ? "flex" : "none";
});