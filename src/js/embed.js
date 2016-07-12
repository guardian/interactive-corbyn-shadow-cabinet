import iframeMessenger from 'guardian/iframe-messenger'
import reqwest from 'reqwest'
import embedHTML from './text/embed.html!text'
import Handlebars from 'handlebars';

function getParameterByName( name ) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

var mode = getParameterByName('mode');
 

window.init = function init(el, config) {
    iframeMessenger.enableAutoResize();


    reqwest({
        url: 'https://interactive.guim.co.uk/docsdata-test/1apoVtkWd-nbLoNMEiopsdoOZK9QHkznOjQrrvuG1Pmk.json',
        type: 'json',
        crossOrigin: true,
        success: function(data){
        	render(data, el, config);
        }
    });
};


function render(data, el, config){
    Handlebars.registerHelper({
        'getImg': function(image, opts) {
            if(image.indexOf('https') > -1){
                return image;
            } else {
                return config.assetPath + '/assets/imgs/' + image + '.jpg'
            }
        }
    });


  	var content = Handlebars.compile( 
                        embedHTML.replace(/%assetPath%/g, config.assetPath), 
                        { 
                            compat: true
                        
                        }
                );
  	if (mode) {
          data.sheets.full = true;
      };
  	el.innerHTML = content(data.sheets);
}