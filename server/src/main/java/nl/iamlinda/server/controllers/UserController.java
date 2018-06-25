package nl.iamlinda.server.controllers;

import nl.iamlinda.server.models.User;
import nl.iamlinda.server.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@Controller
public class UserController {

    @Autowired private UserService userService;

    @ResponseBody
    @RequestMapping(value = "/user", method = RequestMethod.POST)
    public int create(@RequestBody User user) {
        return userService.save(user).getId();
    }

    @ResponseBody
    @RequestMapping(value = "/user/{id}", method = RequestMethod.PUT)
    public int update(@PathVariable  int id, @RequestBody User user) {
        return userService.save(user).getId();
    }

    // findByEmail from http://localhost:8080/user/{email}
    @ResponseBody
    @RequestMapping(value = "/user/{email}", method = RequestMethod.GET)
    public List<User> findByEmail(@PathVariable String email) {
        return userService.findByEmail(email);
    }
    
    // findByUsername from http://localhost:8080/user/name/{username}
    @ResponseBody
    @RequestMapping(value = "/user/name/{username}", method = RequestMethod.GET)
    public List<User> findByUsername(@PathVariable String username) {
        return userService.findByUsername(username);
    }

    //curl  http://localhost:8080/user
    @ResponseBody
    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public List<User> findAll() {
        return (List<User>)userService.findAll();
    }

    @RequestMapping(value = "/page", method = RequestMethod.GET)
    public String page() {
        return "user";
    }
}
