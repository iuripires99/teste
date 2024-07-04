import React from 'react';
import '../../App.css';
import AddPackage from '../../components/admin/PackageAdd';



const PackageAdd = () => {
    return (
        <AddPackage />
    );
}

export default PackageAdd;


/*
//Provavelmente vai ser preciso trocar os values para o id dos packages
const packagesList = [
    { value: 'Adobe', label: 'Adobe' },
    { value: 'Essencial Programming', label: 'Essencial Programming' },
    { value: 'Animation Basics', label: 'Animation Basics' }
]*/

{/*Não esquecer de fazer uma cena como a "notificação que aparece quando adicionamos um filme na ficha 7 (aquele alert informativo)
function SendUpdate() {
        const url = baseUrl + "/edit/" + movieid
        const datapost = {
            title: campTitle,
            description: campDescription,
            image: campImage,
            genre: selectGenre
        };
        axios.post(url, datapost)
            .then(response => {
                if (response.data.success === true) {
                    alert(response.data.message)
                }
                else {
                    alert("Error")
                }
            }).catch(error => {
                alert("Error 34 " + error)
            })
    }


*/ }



{/*para usar o multioption package selection*/ }

{/*npm i --save react-select*/ }