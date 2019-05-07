(function(){

    $('#devour').click(function(){
      console.log('hit');
      let id = $('#burger-id').val().trim();
      $.ajax({
        url: '/burgers',
        method: "PUT",
        data: {id}
      }).then(result => {
        // console.log(result);
        // window.location.reload();
      }).catch(err => {
        if (err) throw err;
      })
    });


})();
