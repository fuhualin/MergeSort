
urlpseudo = './jsFiles/algoCode/mergeSort'
urlcpp = "./jsFiles/algoCode/mergeSort.cpp";
urljava = "./jsFiles/algoCode/mergeSort.java";
urlpython = "./jsFiles/algoCode/mergeSort.py";

d3.select("#algo-name").text("Merge Sort");
displayCodeFromFile(urlpseudo);
sortData();

function swap(i, j)
{
    var temp = dataSet[i];
    dataSet[i] = dataSet[j]; 
    dataSet[j] = temp;
}
//MergeSort
function sorting()
{
    if(playIndex >= 0 && playIndex<record.length )
    {
        dataSet = cloneData(record[playIndex]);
        hline = extraRecord[playIndex][0];
        strAction = extraRecord[playIndex][1];
        if(urlindex == 0) highlightCode(hline);
        actionLabel(strAction);
        redrawBars(dataSet);
        playIndex++;
    }
    else
    {
        clearInterval(timer);
    }
}

function init()
{
    initPlay = false;
    for(var k = 0; k< num; k++)
    {
        dataSet[k].state = states.default;
    }
}

function sortData()
{
    record = []; extraRecord = []; hline = -1; playIndex = 0;
    strAction = "Starting to Sort";
    recordData(dataSet);
    var left = 0, right = dataSet.length - 1, sortFlag = false;

    function setActive(left, right)
    {
        for(var k = 0; k<dataSet.length; k++)
        {
            if(k < left || k>right) dataSet[k].state = states.inactive;
            else dataSet[k].state = states.default;
        }
    }

    function merge(left, middle, right)
    {
        setActive(left, right);
        recordData(dataSet);    
        if(left == 0 && right == dataSet.length - 1) sortFlag = true;

        var temp1 = [], temp2 = [];
        for(var i = left; i<= middle; i++)
            temp1.push({value: dataSet[i].value, state: dataSet[i].state});

        for(var j = middle+1; j<= right; j++)
            temp2.push({value: dataSet[j].value, state: dataSet[j].state});

        var i = 0, j = 0, index = left;
        while(i < temp1.length && j < temp2.length)
        {
            //console.log(temp1[k].value + " and " + temp2[l].value);
            if(temp1[i].value <= temp2[j].value) 
            {   
                strAction = "Active minimum value: " + temp1[i].value + " is copied to index " + (index+1);
                dataSet[index].state = states.swapping; recordData(dataSet);
                dataSet[index] = {value: temp1[i].value, state: temp1[i].state} 
                i++;
            }
            else
            {
                strAction = "Active minimum value: " + temp2[j].value + " is copied to index " + (index+1);
                dataSet[index].state = states.swapping; recordData(dataSet);
                dataSet[index] = {value: temp2[j].value, state: temp2[j].state};
                j++;
            }
            dataSet[index].state = states.swapping; recordData(dataSet);
            if(sortFlag == true) dataSet[index].state = states.sorted;
            else dataSet[index].state = states.default; 
            recordData(dataSet);  index++;
        }
        while(i < temp1.length)
        {
            strAction = "Active minimum value: " + temp1[i].value + " is copied to index " + (index+1);
            dataSet[index].state = states.swapping; recordData(dataSet);
            dataSet[index] = {value: temp1[i].value, state: temp1[i].state} 
            dataSet[index].state = states.swapping; recordData(dataSet);
            if(sortFlag == true) dataSet[index].state = states.sorted;
            else dataSet[index].state = states.default; 
            recordData(dataSet);
            index++; i++;
        }
        while(j < temp2.length)
        {
            strAction = "Active minimum value: " + temp2[j].value + " is copied to index " + (index+1);
            dataSet[index].state = states.swapping; recordData(dataSet);
            dataSet[index] = {value: temp2[j].value, state: temp2[j].state};
            dataSet[index].state = states.swapping; recordData(dataSet);
            if(sortFlag == true) dataSet[index].state = states.sorted;
            else dataSet[index].state = states.default; 
            recordData(dataSet);
            index++; j++;
        }
    }

    function mergeSort(left, right)
    {
        if(left < right)
        {
            var middle = Math.floor((left + right) / 2);
            //console.log("mergesort() " + left + " " + middle);
            strAction = "Active elements index: " + (left+1) + " - " + (middle+1) + "."; 
            hline = 3; setActive(left, middle); recordData(dataSet);
            mergeSort(left, middle); 
  
            //console.log("mergesort() " + (middle+1) + " " + right);
            strAction = "Active elements index: " + (middle+2) + " - " + (right+1) + ".";
            hline = 4; setActive(middle+1, right); recordData(dataSet);
            mergeSort(middle+1, right); 

            //console.log("merge() "+ left + " " + middle + " " + right);
            strAction = "Merging: [" + (left+1) + ", " + (middle+1) + "] and [" + (middle+2) + ", " + (right+1) + "]."; 
            hline = 5;
            merge(left, middle, right);
        }
    }
    mergeSort(left, right);
    strAction = "All data has been sorted."; recordData(dataSet);
    console.log("sorting has been completed");
}

function startSort(firstPlay) // if firstPlay is true then playing, else its resume
{
    if(firstPlay === true) init();
    timer = setInterval(function() { sorting() }, speed );   
}


