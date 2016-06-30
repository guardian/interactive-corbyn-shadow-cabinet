import iframeMessenger from 'guardian/iframe-messenger'
import reqwest from 'reqwest'
import embedHTML from './text/embed.html!text'
import Handlebars from 'handlebars';

window.init = function init(el, config) {
    iframeMessenger.enableAutoResize();


    reqwest({
        url: 'https://interactive.guim.co.uk/docsdata-test/1LoUxmgThGOAbAG6Ankf3iTUV1WeE2ctmgkyFl1EzE3Y.json',
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


