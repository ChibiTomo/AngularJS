$(document).ready(function() {
	$('.display_raw_code').each(function() {		
		var table = $('<table/>').attr('border', '1px');
		table.insertBefore(this);
		
		var header = $('<tr/>').html('<th>RAW</th><th>COMPUTED</th>');
		table.append(header);
		
		var lines = $(this).find('.drc_line');
		if (lines.size() > 0) {
			lines.each(function() {
				var tr = drc_create_line($(this));
				table.append(tr);
			});
		} else {
			var tr = drc_create_line($(this));
			table.append(tr);
		}
		
		var has_explanation = false;
		table.children().children().each(function () {
			has_explanation |= ($(this).children().size() > 2);
		});
		
		if (has_explanation) {
			$('<th/>').html('EXPLANATION')
					.appendTo(header);
		}

		$(this).remove();
	});
});

function drc_create_line(code_obj) {
	var explanation_obj = code_obj.find('.drc_explanation');
	var explanation_txt = '';
	if (explanation_obj.size() > 0) {
		explanation_txt = explanation_obj.html();
		explanation_obj.remove();
	}
	
	var code = $.trim(code_obj.html());

	var tr = $('<tr/>');
	
	var raw_code =  code.replace('{{', '{ {')
						.replace('}}', '} }');
	var raw = $('<td/>').html('<xmp>' + raw_code + '</xmp>');
	tr.append(raw);
	
	var computed = $('<td/>').html(code);
	tr.append(computed);
	
	if (explanation_txt != '') {
		var explanation = $('<td/>').html(explanation_txt);
		tr.append(explanation);
	}

	return tr;
}