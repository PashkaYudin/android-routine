$(document).ready(function() {
    Prism.highlightAll();

    $(document).on("click", "#report", function() {
            getResult();
            return false;
    });

    $(document).on("click", "#clear", function() {
            $('.result').empty();
            return false;
    });

    $(document).on("click", "#clear-tr", function() {
            $(this).parent().parent().remove();
            return false;
    });

	$(document).on("click", "#add", function() {
        var table = $("table"),
            body = table.find("tbody"),
            thisTR = table.find("tr").last(),
            newTR = thisTR.clone();
			newTR.find('input').val("");
			body.append(newTR);
			thisTR.find("input").each(function() {
				$(this).parent().html($(this).val() == "" ? "-" : $(this).val());
			});
			thisTR.find("i.fa-plus-circle").hide();
            thisTR.find("i.fa-times-circle").show();
			return false;
    });
});


    function getResult() {
    	$('.result').empty();
        var ClassName = $('.name').val();
        var count = $('#data tbody tr').length;
        var arrVars = [];
        var arrTypes = [];
        $("#data tr").each(function(){
            arrVars.push($(this).find(".variable").text()); //put elements into array
            arrTypes.push($(this).find(".type").text()); //put elements into array
        });

        var result = 'public class ' + ClassName + ' {'+ '\n';

        for (var i = 1; i <= count-1; i++) {
            result += '\t'+'private '+ arrTypes[i] +' '+ arrVars[i] +';'+'\n';
        }

        result += '\n\t'+'public  '+ ClassName +'() {'+'\n'+
                  '\t'+'}'+'\n\n';

        result += '\t'+'public '+ ClassName +'(';

        for (var i = 1; i <= count-1; i++) {
            result += arrTypes[i] +' '+ arrVars[i] +', ';
        }
        result = result.slice(0,-2);
        result += ') {'+'\n';

        for (var i = 1; i <= count-1; i++) {
            result += '\t\t'+'this.'+arrVars[i]+' = '+arrVars[i]+';'+'\n';
        }
        result += '\t'+'}'+'\n\n';

        for (var i = 1; i <= count-1; i++) {
        result += '\t'+'public '+ arrTypes[i] +' get'+ arrVars[i].capitalize() +'() {'+'\n'+
                    '\t\t'+'return '+ arrVars[i] +';'+'\n'+
                    '\t'+'}'+'\n\n'+
                    '\t'+'public void set'+ arrVars[i].capitalize() +'('+ arrTypes[i] +' '+ arrVars[i] +') {'+'\n'+
                        '\t\t'+'this.'+ arrVars[i] +' = '+ arrVars[i] +';'+'\n'+
                    '\t'+'}'+'\n\n';                    
        }  
        result = result.slice(0,-2);
        result += '\n'+'}';             
                     
        $('.result').append('<pre class="language-java"><code class="language-java">' + result + '</code></pre>');
    }

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }
