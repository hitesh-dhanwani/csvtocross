

 
 
var data = null;
function GetUnique(inputArray)
{
    var outputArray = [];
    for (var i = 0; i < inputArray.length; i++)
    {
        if ((jQuery.inArray(inputArray[i], outputArray)) === -1)
        {
            outputArray.push(inputArray[i]);
        }
    }
    return outputArray;
}
function countA(countarray)
{
    var counts = {};
    for (var i = 0; i < countarray.length; i++)
    {
        var num = countarray[i];
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }
    return counts;
}
$(document).ready(function()
{
    document.getElementById('FileUpload').addEventListener('change', upload, false);
    function isSupport()
    {
        var status = false;
        if (window.File && window.FileReader && window.FileList && window.Blob)
        {
            status = true;
        }
        return status;
    }
    function upload(evt)
    {
        if (!isSupport())
        {
            alert("Browser doesn't support");
        }
        else
        {
            var file = evt.target.files[0];
            var reader = new FileReader();
            reader.readAsText(file);
            reader.onload = function(event)
            {
                var csvData = event.target.result;
                data = $.csv.toArrays(csvData);
                var p = data.length;
                var j = data[0].length;
                var test = data[1][j - 1];
                for (var i = 0; i < GetUnique(test).length; i++)
                {
                    //document.write(GetUnique(test)[i]); 
                }
                if (data && data.length > 0)
                {
                    alert("Uploaded row-" + data.length + "Sucessfully");
                    var html = '';
                    var selection1 = '';
                    var selection2 = '';
                    for (var q = 0; q < p; q++)
                    {
                        if (q === 0)
                        {
                            html += "<thead><tr>";
                            for (var n = 0; n < j ; n++)
                            {
                                html += "<th>";
                                html += data[q][n] + " ";
                                if(n<j-1){
                                selection1 += '<option value=' + n + '>' + data[q][n + 1] + '</option>';
                                selection2 += '<option value=' + n + '>' + data[q][n + 1] + '</option>';}
                                html += "</th>";
                            }
                            html += "</tr></thead>";
                            html += "<br>";
                        } else
                        {
                            html += "<tbody><tr class='active'>";
                            for (var n = 0; n < j; n++)
                            {
                                html += "<td>";
                                html += data[q][n] + " ";
                                html += "</td>";
                            }
                            html += "</tr></tbody>";
                        }
                    }
                    $('#csvTable').append(html);
                    $('#Selection1').append(selection1);
                    $('#Selection2').append(selection2);
                }
                else
                {
                    alert("No data import");
                }
            };
            reader.onError = function()
            {
                alert('Unable to load' + file.fileName);
            };
        }
    }
    $("#convert").click(
            function() {
                var col1 = parseInt($("#Selection1").val());
                var col2 = parseInt($("#Selection2").val());
                var html = '';
                var row = '';
                var colh1 = '';
                var colc1 = '';
                var tot = 0;
                var c1 = new Array();
                for (var i = 1; i < data[0][col1].length; i++)
                {

                    c1.push(data[i][col1 + 1]);
                }

                c1 = GetUnique(c1);

                var c2 = new Array();
                for (var i = 1; i < data[0][col2].length; i++)
                {

                    c2.push(data[i][col2 + 1]);
                }
                c2 = GetUnique(c2);
                var count1 = 0;
                var c3 = new Array(c1.length);
                col1++;
                col2++;
                row += '<thead><tr><th></th>';
                for (var i = 0; i < c2.length; i++)
                {
                    row += '<th>' + c2[i] + '</th>';
                }
                row += '<th>Total</th>';
                row += '</tr></thead><tbody>';
                for (var v = 0; v < c1.length; v++)
                {
                    tot = 0;
                    row += '<tr><th>' + c1[v] + '</th>';
                    for (var o = 0; o < c2.length; o++)
                    {
                        count1 = 0;
                        for (var i = 0; i < data.length; i++)
                        {
                            if (c1[v] === data[i][col1] && c2[o] === data[i][col2])
                                count1++;

                        }
                        tot = tot + count1;
                        row += '<td>' + count1 + '</td>';
                    }
                    row += '<td>' + tot + '</td></tr>';
                }

                row += '<tr><th>Total</th>';
             
                for (var m = 0; m < c2.length; m++)
                {
                    var i = 0;
                    for (var o = 1; o < data.length; o++)
                    {
                        if (data[o][col2] === c2[m])
                        {
                            i++;
                        }
                    }
                    row += '<td>' + i + '</td>';
                }
               
                row += '<td>'+(data.length-1)+'</td></tr></tbody>';
                $('#converted').append(row);
            }
    );
});