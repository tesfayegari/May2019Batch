import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { SPComponentLoader } from '@microsoft/sp-loader';
require('./style.css');
import * as strings from 'DisplayListsWebPartStrings';
import { ILists, ISPList } from "./ISPLists";
import { SPHttpClient, SPHttpClientResponse } from '@microsoft/sp-http';

export interface IDisplayListsWebPartProps {
  description: string;
}

export default class DisplayListsWebPart extends BaseClientSideWebPart<IDisplayListsWebPartProps> {
  
  public render(): void {
    SPComponentLoader.loadCss('https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css');
    this.domElement.innerHTML = `
      
      <h1>Lists under this ste</h1>
      <ul id="listDisplay" class="list-group">
        <li class="list-group-item">List 1 (2)</li>
        <li class="list-group-item">List 2 (4)</li>
        <li class="list-group-item">List 3 (112)</li>
        <li class="list-group-item">List 4 (23)</li>
      </ul>
      `;
      this._getListData().then(response => {
        console.log(response);
        let myListsHtml = '';
        for(let list of response.value){
          console.log(list.Title);
          myListsHtml += `<li class="list-group-item"> ${list.Title} (${list.ItemCount}) Items </li>`;
        }
        
        // response.forEach(list => { myListsHtml += `<li> ${list.Title} (${list.ItemCount}) Items </li>`; });
        this.domElement.querySelector('#listDisplay').innerHTML = myListsHtml;
      }, error => {console.log('Error Happened', error);});
  }

  private _getListData(): Promise<ILists> {
    return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
      .then((response: SPHttpClientResponse) => {
        return response.json();
      });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: 'Webpart Title'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
