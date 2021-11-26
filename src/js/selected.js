export default () => {
  const selectFamily = document.querySelector('#family'),
    selectType = document.querySelector('#type');




    selectFamily.addEventListener('change', () => {

    if(event.target.value){
        selectType.disabled = false;
    } else {
        selectType.disabled = true;
        selectType.value = '';
    }
    
  });

};
