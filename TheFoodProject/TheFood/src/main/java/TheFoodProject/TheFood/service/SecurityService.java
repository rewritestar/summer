package TheFoodProject.TheFood.service;

import TheFoodProject.TheFood.entity.StartTokenForm;
import TheFoodProject.TheFood.entity.TokenUser;
import TheFoodProject.TheFood.entity.User;
import TheFoodProject.TheFood.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
@Slf4j
@Service
public class SecurityService {
    @Autowired
    private UserRepository userRepository;

//    private  static  final String key= "adjfhkjdhfkjdshfdhsfajdfhkdjahfkladjshfeufhekjfheluehfkejahfluewidi";
    private SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256); // 토큰 암호화키

//    @Value("${jwt.password}")
//    private String secretKey;
    private int tokenExpirationMsec = 60*1000*30;  // 만료시간 지금은 테스트해보고 싶어서 1분으로 해둠/ 30분 설정 계산은 -> 30분 30*1000*60



//    ------------------------------------------------------------------------------------------------------
    //토큰 생성코드
    public StartTokenForm createToken(String useremail) {

        StartTokenForm tokenForm = new StartTokenForm();

        Date date = new Date();


        ////비번으로 암호화할거면 이 코드 필요
//        SignatureAlgorithm signatureAlgorithm = SignatureAlgorithm.HS256; //토큰 암호화 방법?함수?
//        byte[] secretKeyBytes = DatatypeConverter.parseBase64Binary(key); //64비트
//        Key signingkey = new SecretKeySpec(secretKeyBytes, signatureAlgorithm.getJcaName());

        String token =  Jwts.builder()
                .setSubject(useremail) //토큰 정보 중 하나에 들어감/ 토큰 제목?
                .signWith(key, SignatureAlgorithm.HS256)
//                .signWith(signingkey, signatureAlgorithm) //비밀번호로 암호화할거면 윗줄 대신 이거 사용
                .setExpiration(new Date(System.currentTimeMillis() + tokenExpirationMsec))  //만료시간
                .compact();//토큰 생성 완료

        tokenForm.setToken(token);
        tokenForm.setExpiration(tokenExpirationMsec);

        return tokenForm;

    }

//        ------------------------------------------------------------------------------------------------------
    //토큰에서 유저 이메일 추출하고 이를 통해 유저 알아내기
    public TokenUser getUser(String token){
        Claims claims = Jwts.parserBuilder()
//                .setSigningKey(DatatypeConverter.parseBase64Binary(key))
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token) // 토큰 풀어주기? 알아볼 수 있는 형태로
                .getBody();
        String tokenUseremail =  claims.getSubject();
        //유저 찾기
        User people = userRepository.findByUseremail(tokenUseremail);
        TokenUser tokenUser = new TokenUser();
        tokenUser.setUseremail(people.getUseremail());
        tokenUser.setId(people.getId());
        tokenUser.setUsername(people.getUsername());
        return tokenUser;

    }

//        ------------------------------------------------------------------------------------------------------
    //토큰 유효성 판단
    public boolean validateToken(String token) throws JwtException
    {
        try{
            Jwts.parserBuilder()
                    .setSigningKey(key)
//                    .setSigningKey(DatatypeConverter.parseBase64Binary(key))
                    .build()
                    .parseClaimsJws(token);
            return true;
        }
        catch (JwtException e){
            e.printStackTrace();
            return false;
        }
    }


    //==토큰 앞 부분('Bearer') 제거 메소드==//?? //아직은 사용안하는데 뭔가 찾아보니 나중에 필요하게 될것도 같아서 일단 놔둠
    private String BearerRemove(String token) {
        return token.substring("Bearer ".length());
    }


}
