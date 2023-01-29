//method to get all data
function allData(){
            
    table.innerHTML = ``
    //disini saya menggunakan JSON.parse, untuk mengubah dari string ke array
    contactList = JSON.parse(localStorage.getItem('listItem')) ?? []

    //looping data untuk ditampilkan pada table
    contactList.forEach(function (value, i){
       
        var table = document.getElementById('table')

        table.innerHTML += `
            <tr>
                <td>${i+1}</td>
                <td>${value.merk}</td>
                <td>${value.type}</td>
                <td>${value.cc}</td>
                <td>${value.tahun}</td>
                <td>
                    <button class="btn btn-sm btn-success" onclick="find(${value.id})">
                        <i class="fa fa-edit"></i>
                    </button>
                </td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="removeData(${value.id})">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>`
    })
}
function save(){

    contactList = JSON.parse(localStorage.getItem('listItem')) ?? []

    //id terakhitr pada array akan disimpan pada id variable 
    var id
    contactList.length != 0 ? contactList.findLast((item) => id = item.id) : id = 0

    if(document.getElementById('id').value){

        //edit contactlist berdasarkan value
        contactList.forEach(value => {
            if(document.getElementById('id').value == value.id){
                value.merk      = document.getElementById('merk').value, 
                value.type      = document.getElementById('type').value, 
                value.cc   = document.getElementById('cc').value, 
                value.tahun     = document.getElementById('tahun').value
            }
        });

        document.getElementById('id').value = ''

    }else{

        //menyimpan data dari form
        var item = {
            id        : id + 1, 
            merk     : document.getElementById('merk').value, 
            type       : document.getElementById('type').value, 
            cc   : document.getElementById('cc').value, 
            tahun     : document.getElementById('tahun').value
        }

        //tambahkan item data ke array contactlist
        contactList.push(item)
    }

    // save array into localstorage
    localStorage.setItem('listItem', JSON.stringify(contactList))

    //update table list
    allData()
}
function find(id){

    contactList = JSON.parse(localStorage.getItem('listItem')) ?? []

    contactList.forEach(function (value){
        if(value.id == id){
           document.getElementById('id').value = value.id
           document.getElementById('merk').value = value.merk
           document.getElementById('type').value = value.type
           document.getElementById('cc').value = value.cc
           document.getElementById('tahun').value = value.tahun
        }
    })
}
function removeData(id){
    
    contactList = JSON.parse(localStorage.getItem('listItem')) ?? []

    contactList = contactList.filter(function(value){ 
        return value.id != id; 
    });

    // save array into localstorage
    localStorage.setItem('listItem', JSON.stringify(contactList))

    //get data again
    allData()
}