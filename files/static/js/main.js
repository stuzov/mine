
//=================================================
//   ТОЧКИ ДОБОРА
//=================================================

function ap_add(model_id){
	
    // добавление точек добора

	var jqxhr = $.post(`/ap/add/${model_id}/`, function(res) {
		  if  (res['result'] == 0){
		  
			  var id = res['apid'] 	
              var counter = res['counter'] 	
              var drawdown = res['drawdown'] 	
              var volume = res['volume'] 	
              
              var tr = 
						`<tr id="ap_${id}">
						<th scope="row" style="width:20%">${counter}</th>
						<td> <input type="text" class="form-control" id="drawdown_id_${id}"  name="drawdown_name_${id}"  value="${drawdown}" onchange="ap_edit(${id})"  ></td>
						<td><input type="text" class="form-control" id="volume_id_${id}" name="volume_name_${id}"  value="${volume}" onchange="ap_edit(${id})"></td>
						<td><button type="button" class="btn btn-danger"  onclick="ap_delete(${id})">x</button></td>
						</tr>`	  
				
				$('#ta_table').append(tr);
              
		  }
		
		  else {
		      alert(res['result'])
		  }
			
	})  		
}


function ap_edit(ap_id){
    
    // редактирвоание точек добора
    
    var drawdown = $(`#drawdown_id_${ap_id}`).val(); 	
    var volume = $(`#volume_id_${ap_id}`).val();
    
    
    var data = {volume_name: volume, 
                drawdown_name: drawdown, 
               }
	

	var jqxhr = $.post(`/ap/edit/${ap_id}/`, data=data,  function(res) {
		  if  (res['result'] == 0){
		  
			  var id = res['apid'] 	
              var counter = res['counter'] 	
              var drawdown = res['drawdown'] 	
              var volume = res['volume'] 	
              	
			  $(`#volume_id_${ap_id}`).val(res['volume']);
              $(`#drawdown_id_${ap_id}`).val(res['drawdown']);
              
		  }
		
		  else {
		      alert(res['result'])
		  }
			
	})  		
}


function ap_delete(ap_id){
    
    // удаление точек добора
    
  
	var jqxhr = $.post(`/ap/delete/${ap_id}/`, function(res) {
		  if  (res['result'] == 0){
              $(`#ap_${ap_id}`).remove();
		   
		  }
		
		  else {
		      alert(res['result'])
		  }
			
	})  		
}



//=================================================
//   ТОЧКИ TAKE PROFIT
//=================================================




function tp_add(model_id){
	
    // добавление точек TP

	var jqxhr = $.post(`/tp/add/${model_id}/`, function(res) {
		  if  (res['result'] == 0){
		  
			  var id = res['tpid'] 	
              var counter = res['counter'] 	
              var growth = res['growth'] 	
              var volume = res['volume'] 	
              var vol_sum = res['vol_sum'] 	
              
              var tr = 
						`<tr id="tp_${id}">
						 <th scope="row" style="width:20%">${counter}</th>
						 <td> <input type="text" class="form-control" id="growth_id_${id}"  name="growth_name_${id}" value="${growth}"  onchange="tp_edit(${id})" ></td>
						 <td><input type="text" class="form-control" id="tpvolume_id_${id}"  name="tpvolume_name_${id}" value="${volume}" onchange="tp_edit(${id})" ></td>
						 <td><button type="button" class="btn btn-danger" onclick="tp_delete(${id})">x</button></td>
						</tr>`	  
				
				$('#tp_table').append(tr);
                $('#tp_vol_sum_id').html(vol_sum);
              
		  }
		
		  else {
		      alert(res['result'])
		  }
			
	})  		
}





function tp_edit(tp_id){
    
    // редактирвоание точек TP
    
    
    var growth = $(`#growth_id_${tp_id}`).val(); 	
    var volume = $(`#tpvolume_id_${tp_id}`).val();
    
    
    var data = {volume_name: volume, 
                growth_name: growth, 
               }
    
    
 

	var jqxhr = $.post(`/tp/edit/${tp_id}/`, data=data,  function(res) {
		  if  (res['result'] == 0){
		  
			  var id = res['tpid'] 	
              var counter = res['counter'] 	
              var growth = res['growth'] 	
              var volume = res['volume'] 
              var vol_sum = res['vol_sum'] 	
              	
			  $(`#tpvolume_id_${tp_id}`).val(res['volume']);
              $(`#growth_id_${tp_id}`).val(res['growth']);
              $('#tp_vol_sum_id').html(vol_sum);
              
		  }
		
		  else {
		      alert(res['result'])
		  }
			
	})  		
}


function tp_delete(tp_id){
    
    // удаление точек TP
    
  
	var jqxhr = $.post(`/tp/delete/${tp_id}/`, function(res) {
		  if  (res['result'] == 0){
              $(`#tp_${tp_id}`).remove();
              var vol_sum = res['vol_sum'];
              $('#tp_vol_sum_id').html(vol_sum);
		   
		  }
		
		  else {
		      alert(res['result'])
		  }
			
	})  		
}



//=================================================
//   Хэджирование сделок (план выхода)
//=================================================




function hp_add(model_id){
	
    // добавление точек sl

	var jqxhr = $.post(`/hp/add/${model_id}/`, function(res) {
		  if  (res['result'] == 0){
		  
			  var id = res['hpid'] 	
              var counter = res['counter'] 	
              var sl_increment = res['sl_increment'] 	
              
              var tr = 
						`<tr id="hp_${id}">
						 <th scope="row" style="width:20%">${counter}</th>
						 <td> <input type="text" class="form-control" id="sl_increment_id_${id}"  name="sl_increment_name_${id}" value="${sl_increment}"  onchange="hp_edit(${id})"></td>
						 <td>---</td>
						<td><button type="button" class="btn btn-danger" onclick="hp_delete(${id})">x</button></td>
						</tr>`	  
				
				$('#th_table').append(tr);
              
		  }
		
		  else {
		      alert(res['result'])
		  }
			
	})  		
}





function hp_edit(hp_id){
    
    // редактирвоание точек SL
    
    
    var sl_increment = $(`#sl_increment_id_${hp_id}`).val();
    
    
    var data = {sl_increment_name: sl_increment}
    
    
	var jqxhr = $.post(`/hp/edit/${hp_id}/`, data=data,  function(res) {
		  if  (res['result'] == 0){
		  
			  var id = res['hpid'] 	
              var counter = res['counter'] 	
              var sl_increment = res['sl_increment'] 	
              	
			  $(`#sl_increment_id_${hp_id}`).val(res['sl_increment']);
              
		  }
		
		  else {
		      alert(res['result'])
		  }
			
	})  		
}


function hp_delete(hp_id){
    
    // удаление точек SL
    
  
	var jqxhr = $.post(`/hp/delete/${hp_id}/`, function(res) {
		  if  (res['result'] == 0){
              $(`#hp_${hp_id}`).remove();
		   
		  }
		
		  else {
		      alert(res['result'])
		  }
			
	})  		
}





//=================================================
//   Редактирование модели
//=================================================


function model_edit(mid){
    
    // редактирование настроек модели
    
    var name = $(`#name_id`).val();
    
    var fv_depo = $(`#fv_depo_id`).val();
    var depo = $(`#depo_id`).val();
    var sl = $(`#sl_id`).val();
    var timeout = $(`#timeout_id`).val();
    var daterange = $(`#daterange_id`).val();
    
    var max_opened_positions = $(`#max_opened_positions_id`).val();
    var signals_in_same_position = $(`#signals_in_same_position_id`).val();
    var max_deal_margin = $(`#max_deal_margin_id`).val();
    var shoulder = $(`#shoulder_id`).val();
    var signals_source = $(`#signals_source_id`).val();
    
    var close_by_opposite_signal = $(`#close_by_opposite_signal_id`).is(':checked');
   
    var data = {fv_depo_name: fv_depo,
                depo_name: depo,
                sl_name: sl,
                timeout_name: timeout,
                daterange_name: daterange,
                
                max_opened_positions_name: max_opened_positions,
                signals_in_same_position_name: signals_in_same_position,
                max_deal_margin_name: max_deal_margin,
                shoulder_name: shoulder,
                name_name: name,
                signals_source_name: signals_source,
                close_by_opposite_signal_name: close_by_opposite_signal
               }
    
    
	var jqxhr = $.post(`/model/${mid}/`, data=data,  function(res) {
		  if  (res['result'] == 0){
		  
			  var id = res['hpid']; 	
              $('#h1name_id').html(name);
              $('title').html(name);
              
              
		  }
		
		  else {
		      alert(res['result'])
		  }
			
	})  		
}



function modelcoin_toggle(mid, cid){
    
    // включение / выключение монет из расчёта
	var jqxhr = $.get(`/model/${mid}/coin/${cid}/toggle/`,  function(res) {
		  if  (res['result'] == 0){
		  }
		
		  else {
		      alert(res['result'])
		  }
	})  		
}


function modelcoin_toggle_all(mid){
	var checked = $('#toggle_all_checkbox').is(':checked')
	
	if (checked) {
		$('#check_all_cb').toggle();
		$('#uncheck_all_cb').toggle();
		 $('.form-check-input').prop('checked', true);  
		modelcoin_check_all(mid);
	}
	
	else{
		$('#check_all_cb').toggle();
		$('#uncheck_all_cb').toggle();
		$('.form-check-input').prop('checked', false);  
		modelcoin_uncheck_all(mid)
		
	}
}


function modelcoin_check_all(mid){
    
    // включение всех монет в расчёт
	var jqxhr = $.get(`/model/${mid}/coin/all/check/`,  function(res) {
		  if  (res['result'] == 0){
		  }
		
		  else {
		      alert(res['result'])
		  }
	})  		
}


function modelcoin_uncheck_all(mid){
    
    // выключение всех монет из расчёта
	var jqxhr = $.get(`/model/${mid}/coin/all/uncheck/`,  function(res) {
		  if  (res['result'] == 0){
		  }
		
		  else {
		      alert(res['result'])
		  }
	})  		
}


