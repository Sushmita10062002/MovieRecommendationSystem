let predict_btn = document.querySelector(".predict-btn")
let project_section = document.querySelector('.project-section')
let loader = document.querySelector(".loader")
let result_con = document.querySelector("#result")
let  movie_form = document.querySelector("#movie-form")


predict_btn.addEventListener("click",function(){
    //display loader
    predict_btn.style.backgroundColor = "#880808"
    loader.style.display = "block"
    //Remove already created grid element
    let grid = document.querySelector(".grid")
    if(grid){
       project_section.removeChild(grid)
    }
    
    //get form data and send post request to /predict

    var form_data = new FormData(movie_form);

    const otherParam = {
     body: form_data,
     method: "POST"
    }
   
    fetch("/predict",otherParam).then(data=>{
     return data.text()
    }).then(res=>{
        result_con.innerHTML = " "

        //creating grid element for displaying image and title 
        //our response will be as string of this form ->
        //   "movietitle1--movieposter1--movietitle2--movieposter2--movietitle3--movieposter3--movietitle--movieposter4
        // --movietile5--movieposter5"
        result = ""
        let our_response = res.split('--')
        let rlen = our_response.length
        if (rlen>1){ 
            for (let h=0; h < rlen; h=h+2){
            result += `<div className="card">
            <img src=${our_response[h+1]} alt="project-img" class="card-img" />
            <h4>${our_response[h]}</h4>
            </div>`} 
            var grid = document.createElement('div')
            grid.classList.add("grid")
            grid.innerHTML = result
            project_section.appendChild(grid)
        }
        else {
            //if our response will be that "this movie is not in our database. check spelling or try another movie"
          result_con.innerHTML = res
        }
        result_con.style.display = "block"
        movie_form.reset()
        loader.style.display = "none"
        predict_btn.style.backgroundColor = 'red'
    }).catch(error=>console.log(error))
})