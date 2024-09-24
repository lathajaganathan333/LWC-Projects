import { MessageContext, subscribe, unsubscribe } from 'lightning/messageService';
import { LightningElement, wire } from 'lwc';
import Callopp from '@salesforce/messageChannel/Callopp__c';
import getOpportunities from '@salesforce/apex/AccountHandlerClass.getOpportunities';
export default class ShowAccountContacts extends LightningElement {

    subscription=null;

    @wire (MessageContext) messageContext;
    accountId;
    accountName;
    title="Opportunities";
    opps;
    hasOpps;

    connectedCallback()
    {
        this.handleSubscribe();
    }

    disconnectedCallback()
    {
        this.handleUnsubscribe();
    }

    handleSubscribe()
    {
        if(!this.subscription)
        {
            this.subscription=subscribe(this.messageContext, Callopp ,
                (parameter)=> 
                {
                    this.accountId=parameter.accountId;
                    this.accountName=parameter.accountName;
                    this.title=this.accountName+"'s"+" Opportunities";
                    this.getOpps();
                }
                );
        }
        
    }
    async getOpps(){
        this.opps = await getOpportunities({accountId:this.accountId});
        this.hasOpps=this.opps.length>0?true:false;

    }
    handleUnsubscribe()
    {
        unsubscribe(this.subscription);
        this.subscription=null;
    }
}