//package TheFoodProject.TheFood.Config;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
//
//import javax.sql.DataSource;
//
//@Configuration
//@EnableWebSecurity
//public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
//
//    @Autowired
//    private DataSource dataSource;
//
//    @Override
//    protected void configure(HttpSecurity http) throws Exception {
////        http
////                .authorizeRequests()
////                .antMatchers("/board/**", "/user/join", "/user/joinpro", "/user/loginpro").permitAll()
////                .anyRequest().authenticated()
////                .and()
////                .formLogin()
////                .loginPage("/user/login")
////                .permitAll()
////                .and()
////                .logout()
////                .permitAll();
//    }
//
//    @Autowired
//    public void configureGlobal(AuthenticationManagerBuilder auth)
//            throws Exception {
//        auth.jdbcAuthentication()
//                .dataSource(dataSource)
////                .passwordEncoder(passwordEncoder())
//                .usersByUsernameQuery("select username, useremail, userid, userpassword, enabled "
//                        + "from user "
//                        + "where username = ?")
//                .authoritiesByUsernameQuery("select u.username, r.name "
//                        + "from user_role ur inner join user u on ur.user_id = u.id "
//                        + "inner join role r on ur.role_id = r.id "
//                        + "where u.username = ?");
//    }
//
////    @Bean
////    public PasswordEncoder passwordEncoder() {
////        return new BCryptPasswordEncoder();
////    }
//}
