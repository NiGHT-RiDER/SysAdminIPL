import React, { Component } from 'react'
import { saveFile } from '../../helpers/db'
import ReactFileReader from 'react-file-reader'


export default class Upload extends Component {
    
    handleFiles = (files) => {
        var reader = new FileReader();
        reader.onload = function(loadedEvent) {
            // result contains loaded file.
            let res = loadedEvent.target.result.split('\n');
            res.map(x => {
                console.log(x);
                saveFile(x.replace(/['"]+/g, '').split(";"));
            });
        }
        reader.readAsText(files[0]);
      }
     
     
     
      render() {
        return (
          <div>
              <p>
                  Veuillez inserer un fichier TXT contenant les informations concernant les machines.
              </p>
              <ReactFileReader fileTypes={[".txt"]} handleFiles={this.handleFiles}>
                <button className='btn'>Upload</button>
              </ReactFileReader>
          </div>
        );
      }
   
}