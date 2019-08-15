import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
require('./style.css');
import * as strings from 'DisplayListsWebPartStrings';

export interface IDisplayListsWebPartProps {
  description: string;
  dob: string;
}

export default class DisplayListsWebPart extends BaseClientSideWebPart<IDisplayListsWebPartProps> {
  private calculateAge(dateOfBirth: string){
    let dob = new Date(dateOfBirth);
    return (new Date()).getFullYear() - dob.getFullYear();
  }
  public render(): void {
    this.domElement.innerHTML = `
      <h1>${this.properties.description}'s Age :</h1>
      <h2>${this.properties.description}, Your age is  ${this.calculateAge(this.properties.dob)} Years</h2>
      `;
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
                  label: 'Your Name'
                }),
                PropertyPaneTextField('dob', {
                  label: 'Date of Birth'
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
