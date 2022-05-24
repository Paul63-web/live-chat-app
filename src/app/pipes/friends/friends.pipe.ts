import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'friends'
})
export class FriendsPipe implements PipeTransform {

  public UserNotFound: boolean = false;

  transform(allFriendList: any[], searchFriend: any): any {
    searchFriend = searchFriend.toLowerCase();
    if(!searchFriend) return allFriendList;
      let filteredUser = allFriendList.filter(user=>
      user.username.toLowerCase().includes(searchFriend))
      if (filteredUser.length == 0) {
        console.log("user not found")
        // return this.UserNotFound = true;
      }
      return filteredUser; 
  }

}
