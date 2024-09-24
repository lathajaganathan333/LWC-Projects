import { LightningElement,api, wire } from 'lwc';
import getAccounts from '@salesforce/apex/AccountHandlerClass.getAccounts';
import { MessageContext, publish } from 'lightning/messageService';
import Callopp from '@salesforce/messageChannel/Callopp__c';


export default class AccChild2 extends LightningElement {
    @api searchTextChild2;
    @wire(MessageContext)messageContext;
    columns=[
        {label:'Id',fieldName:'Id'},
        {label:'Name',fieldName:'Name'},
        {label:'Actions',fieldName:'Actions',type:'button',typeAttributes:
            {
                label:'View Opportunities',
                value:'view_opportunities'
            }
        }
    ]
currentId;
currentName;
    handleRowAction(event){
        if(event.detail.action.value=='view_opportunities'){
        this.currentId=event.detail.row.Id;
        this.currentName=event.detail.row.Name;
        const payLoad={
            accountId:event.detail.row.Id,
            accountName:event.detail.row.Name
           
        };
        console.log('Payload is: ' + JSON.stringify(payLoad, null, 2));
        publish(this.messageContext,Callopp,payLoad)
        console.log('payload is :'+payLoad);
        }
    }
    @wire(getAccounts,{searchTextClass:'$searchTextChild2'})accountRecord;
}