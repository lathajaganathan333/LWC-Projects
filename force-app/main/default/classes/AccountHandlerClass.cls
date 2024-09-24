public with sharing class AccountHandlerClass {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(String searchTextClass){
        try {
            if(String.isEmpty(searchTextClass)){
            return [SELECT Id,Name FROM Account];
            }else{
                searchTextClass ='%'+searchTextClass+'%';
                return [SELECT Id,Name FROM Account WHERE NAME LIKE :searchTextClass];
            }

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Opportunity> getOpportunities(String accountId){
        try {
            return [SELECT Id,Name FROM Opportunity where accountId=:accountId
            AND StageName='Closed Won'];  
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}