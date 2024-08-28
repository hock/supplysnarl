document.addEventListener("DOMContentLoaded", function(event) {
	console.log("load");
	
	fetch('data.json').then(r => r.json()).then(data => Start(data));
	
	function Start(values) {
		console.log("start");
		
		let options = {
		    item: function(values) {	
				let tags = ['<span class="tag">'+values.term.toLowerCase()+'</span>','<span class="tag">'+values.primary.toLowerCase()+'</span>'];
				if (values.secondary !== '') {
					values.secondary.split(";").forEach(function (item) {
					    tags.push('<span class="tag">'+item.toLowerCase()+'</span>');
					});
				}		
				return `<li class="entry">
							<div class="top">
								${values.name} on ${values.date}					
							</div>
							<div class="image">
								<a href="${values.link}"><img src="tweets/${values.index}.png" /></a>
							</div>
							<div class="bottom">
								<div class="tags">${tags.join(', ')}</div>							
							</div>
							<div class="clear"></div>				
						</li>`;
			},
			page:50,
		    pagination: [ { paginationClass: "pagination", innerWindow: 1, left: 3, right: 3, item: '<li><a class="page"></a></li>'}]	
		};
		let list = new List('datalist', options, values);
		document.querySelectorAll('.sort li').forEach(el => el.addEventListener('click', (e) => { 
			let order = 'asc';
			if (el.classList.contains('active')) {
				order = el.classList.contains('asc') ? 'desc' : 'asc';				
			}
			console.log(order);
			document.querySelectorAll('.sort li').forEach(el => { el.classList.remove('active'); el.classList.remove('asc'); el.classList.remove('desc');});
			el.classList.add('active'); el.classList.add(order);
			list.sort(el.dataset.sort, { order: order });			
		}));
		
		document.querySelectorAll('.tag').forEach(el => el.addEventListener('click', (e) => { 
			document.getElementById('datasearch').value = el.textContent;
			list.search(el.textContent);			
		}));
		list.on('updated', function() {
			document.querySelectorAll('.tag').forEach(el => el.addEventListener('click', (e) => { 
				document.getElementById('datasearch').value = el.textContent;
				list.search(el.textContent);			
			}));
		})

		
		
	}
	

});	