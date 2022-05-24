import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'allUsers'
})
export class AllUsersPipe implements PipeTransform {
  public UserNotFound: boolean = false;

  transform(allUserList: any[], searchUser: any): any {
    searchUser = searchUser.toLowerCase();
    if(!searchUser) return allUserList;
      let filteredUser = allUserList.filter(user=>
      user.fullname.toLowerCase().includes(searchUser) ||
      user.username.toLowerCase().includes(searchUser))
      if (filteredUser.length == 0) {
        console.log("user not found")
        // return this.UserNotFound = true;
      }
      return filteredUser; 
  }

}
