import iframeMessenger from 'guardian/iframe-messenger'
import reqwest from 'reqwest'
import embedHTML from './text/embed.html!text'
import Handlebars from 'handlebars';

window.init = function init(el, config) {
    iframeMessenger.enableAutoResize();


    reqwest({
        url: 'https://interactive.guim.co.uk/docsdata-test/1urZ2IT9O8rXiDUIMHUTKwqA_IAN35R46vuGQg1xXlTE.json',
        type: 'json',
        crossOrigin: true,
        success: function(data){
        	render(data, el, config);
        }
    });
};


function render(data, el, config){



  	var content = Handlebars.compile( 
                        embedHTML.replace(/%assetPath%/g, config.assetPath), 
                        { 
                            compat: true
                        
                        }
                );
  	
  	el.innerHTML = content(data.sheets);
}


// conservative use this data url: 'https://interactive.guim.co.uk/docsdata-test/1urZ2IT9O8rXiDUIMHUTKwqA_IAN35R46vuGQg1xXlTE.json',
// conservative use this in cfg/s3.json  "path": "2016/06/conservative-party-shadow-cabinet" 