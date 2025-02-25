function getDashboard(webpage) {
    return new Promise((resolve,reject) => {
        $.ajax({
            url:'src/frontend/pages/{webpage}',
            method: 'GET',
            datatype: 'html',
            success: function(data){
                resolve(data);
            },
            error: function(xhr, status, error){
                console.error("Error fetching ${webpage}.html", error);
                reject(error);
            }
        });
    });
}