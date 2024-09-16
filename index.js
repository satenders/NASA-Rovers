var date = "none";
var photoArr = [];
var noPhotos = false;
var pageNum = 1;
validations();
$('#err').text("Welcome to NASA Rover Photo Finder. Just select date and navigate through photos");
$('#imgbtn').on('click',function(){
    validations();
    main();
});
$('#nextBtn').on('click',function(){
    $('#num').val(++pageNum);
    validations();
    main();
});
$('#prevBtn').on('click',function(){
    $('#num').val(--pageNum);
    validations();
    main();
});

function main(){
    pageNum = $('#num').val();
    if($('#date').val()===""){
        alert('Please enter date!');
    }
    else{
        $('#img-div').empty();
        date = $('#date').val();
        $.ajax({
            type: "GET",
            url: "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos",
            data: {
                api_key: "D9MESAn8QQeK7TgKcPrJRB2V6gV37iLF4q5MwpAQ",
                earth_date: date
            },
            success: function (data) {
                console.log(data);
                photoArr = data.photos;
                var newImg;
                validations();
                for(let i=(pageNum-1)*12;i<pageNum*12;i++){
                    newImg = $('<img/>',{
                        src: photoArr[i].img_src,
                        alt: photoArr[i].id,
                        "class" : "w-full h-full"
                    })
                    $('#img-div').append(newImg);
                }
            }
        }).fail(function () { 
            console.log('Fetching Failed!');
         });
    }
}

function displayNoImg(status){
    
}

function validations(){
    if(pageNum==1){
        $('#prevBtn').attr('disabled','');
        $('#prevBtn').addClass('bg-slate-100 hover:bg-slate-100 text-white')
    }

    else{
        $('#prevBtn').removeAttr('disabled','');
        $('#prevBtn').removeClass('bg-slate-100 hover:bg-slate-100 text-white')
    }

    if(photoArr.length===0){
        if($('#err').hasClass("hidden")){
            $('#err').text("No data available for this date!")
            $('#err').removeClass("hidden");
            $('#num').val(Math.ceil(photoArr.length/12));
        }
        else{
            $('#err').text("No data available for this date!");
            $('#num').val(1);
        }
    }
    else{
    if(Math.ceil(photoArr.length/12)+1<=pageNum){
        if($('#err').hasClass("hidden")){
            alert('End of the list!');
            $('#num').val(Math.ceil(photoArr.length/12));
        }
        else{
            $('#err').text("End of the list!");
            $('#num').val() = Math.ceil(photoArr.length/12);
        }
    }
    else{
        if($('#err').hasClass("hidden")){
            
        }
        else{
            $('#err').addClass("hidden")
        }
    }
}



    if(pageNum<1){
        alert('Enter valid page number!');
        $('#num').val(1);
    }
}
