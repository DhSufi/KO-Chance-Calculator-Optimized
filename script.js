function mult(poly1, poly2){
    let ret = new Array(poly1.length + poly2.length - 1).fill(0);
    for (let i = 0; i < poly1.length; i++) {
        for (let j = 0; j < poly2.length; j++) {
            ret[i + j] += poly1[i] * poly2[j];
        }
    }
    return ret;
}

function getOccurrence(array, value) {
  return array.filter((v) => (v === value)).length;
}

function get_result(){

    document.querySelector('#error').innerText = '';
    document.querySelector('#ko').innerText = 'Change of KO:';
    document.querySelector('#tko').innerText = 'Times KO:';
    document.querySelector('#tsur').innerText = 'Times Survive:';
    document.querySelector('#tcomb').innerText = 'Total Combinations:';

    var hp = document.querySelector("#hp").value;
    if (!hp.trim().match(/^[0-9]+$/) || hp.trim() === ""){
        document.querySelector('#error').innerText = 'ERROR IN HP';
        return
    }
    hp = parseInt(hp);

    var inputs = document.querySelectorAll(".rol");
    var Sets = []
    for (var i = 0; i < inputs.length; i++) {
        Sets.push(inputs[i].value.replace(/\(|\)/g, '').split(','))
    }

    for (var i = 0; i < Sets.length; i++) {
        for (var x = 0; x < Sets[i].length; x++) {
            if(!Sets[i][x].trim().match(/^[0-9]+$/) || Sets[i][x].trim() === ""){
                document.querySelector('#error').innerText = 'ERROR IN SET ' + (i+1) + ', POSITION: ' + x + ', CONTENT: ' + Sets[i][x];
//                console.log('ERROR IN ROLS SET ' + (i+1) + ', POSITION: ' + x + ', CONTENT: ' + Sets[i][x])
                return
            }
            Sets[i][x] = parseInt(Sets[i][x])
        }
    }

    var polynoms = []
    for (var i = 0; i < Sets.length; i++) {
        var min_val = Math.min(...Sets[i])
        var max_val = Math.max(...Sets[i])
        placeholder = new Array(min_val).fill(0);
        for (var x = min_val; x <= max_val; x++) {
            if (Sets[i].includes(x)){
                placeholder.push(getOccurrence(Sets[i], x));
            }
            else{
                placeholder.push(0)
            }
        }
        polynoms.push(placeholder);
    }

    var result;
    for (var i = 0; i < polynoms.length; i++) {
        if (!result){
            result = polynoms[i]
        }
        else{
            result = mult(result, polynoms[i]);
        }
    }

    var pos = 0
    var neg = 0
    for (var i = 0; i < result.length; i++) {
        if (i >= hp){
            pos = pos + result[i]
        }
        else{
            neg = neg + result[i]
        }
    }

    document.querySelector('#ko').innerText = 'Change of KO: ' + ((pos / (pos + neg)) * 100) + '%';
    document.querySelector('#tko').innerText = 'Times KO: ' + pos;
    document.querySelector('#tsur').innerText = 'Times Survive: ' + neg;
    document.querySelector('#tcomb').innerText = 'Total Combinations: ' + (pos+neg);


//    console.log('Change of KO: ' + ((pos / (pos + neg)) * 100) + '%');
//    console.log('Times KO: ' + pos);
//    console.log('Times Survive: ' + neg);
//    console.log('Total Combinations: ' + (pos+neg));


}


function add(){
    var container = document.querySelector('.sets.container');
    var sets = container.querySelectorAll('div');
    var ids = []
    for (var i = 0; i < sets.length; i++) {
           ids.push(sets[i]["id"]);
    }

    var div = document.createElement("div");
    div.setAttribute('id', (Math.max(...ids)+1));
    div.innerText = 'Set ' + (Math.max(...ids)+1) + ':';
    container.appendChild(div);

    var input = document.createElement("input");
    input.setAttribute('class', 'rol');
    div.appendChild(input);

}

function remove(){
    var container = document.querySelector('.sets.container');
    var sets = container.querySelectorAll('div');
    var ids = []
    for (var i = 0; i < sets.length; i++) {
           ids.push(sets[i]["id"]);
    }
    if (Math.max(...ids) == 2){
        return
    }
    element = sets[Math.max(...ids)-1].remove()
}

//get_result()
