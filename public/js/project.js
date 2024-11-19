// 

$(document).ready(function() {
    // Image preview function
    $('#userfile').change(function() {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#preview').attr('src', e.target.result).show();
        }
        reader.readAsDataURL(this.files[0]);
    });

    // $('#fileUploadForm').on('submit', function(e) {
    //     e.preventDefault();

    //     var formData = new FormData(this);

    //     $.ajax({
    //         type: 'POST',
    //         url: '/file-upload-action',
    //         data: formData,
    //         contentType: false,
    //         processData: false,
    //         success: function(response) {
    //             alert('File uploaded successfully!');
    //             window.location.href = '/usershow';  // Redirect to showuser page
    //         },
    //         error: function(error) {
    //             alert('Error uploading file');
    //             console.log(error);
    //         }
    //     });
    // });
});
