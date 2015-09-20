# ShippableQuestion
Find number of issues in any public git repository using github api


Problem Description 

Create a repository on GitHub and write a program in any programming language that will do the following: 
Input :
User can input a link to any public GitHub repository
Output :
UI should display a table with the following information -
- Total number of open issues
- Number of open issues that were opened in the last 24 hours
- Number of open issues that were opened more than 24 hours ago but less than 7 days ago
- Number of open issues that were opened more than 7 days ago

Algorithm:-

When user enter the url first we check he enters is correct format 'https://github.com/users/repo'
Then with Github api to find the repo information we are checking the total number of open issues.

To find open isses within the given time limit
 Since github api gives issues in an repo for just one page we reading through all the pages by looping and checking the updated date of each issues and comparing it with give time periods.
 
