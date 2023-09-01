<template>
  <div>
          <TheHeader /> 
          <slot/>
  </div>
  </template>
  
  <script>


  export default {
    
  }
  </script>
 <style>
  @import url('https://fonts.googleapis.com/css2?family=Inter&family=Merriweather:wght@300&family=Poppins&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@500&display=swap');
 html{
  font-family: 'Poppins';
  margin: 0;
  padding: 0;
  background-color: #070417;

 
}
body{
  margin: 0;
  padding: 0;
  overflow: hidden;
}
 
 </style>