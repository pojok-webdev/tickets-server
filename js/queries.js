<<<<<<< HEAD
var
getTickets = (obj) => {
    sql = 'select A.id,A.clientname,A.kdticket, A.status, '
    sql+= 'case A.status when "0" then "Open" when "1" then "Closed" end humanstatus, '
    sql+= 'case A.requesttype '
    sql+= 'when "pelanggan" then B.address '
    sql+= 'when "backbone" then C.location '
    sql+= 'when "bts" then D.location '
    sql+= 'when "datacenter" then E.location '
    sql+= 'when "ptp" then "-" '
    sql+= 'when "core" then "-" '
    sql+= 'when "ap" then "-" '
    sql+= 'end addr '
    sql+= 'from tickets A '
    sql+= 'left outer join clients B on B.id=A.client_site_id '
    sql+= 'left outer join backbones C on C.id=A.backbone_id '
    sql+= 'left outer join btstowers D on D.id=A.btstower_id '
    sql+= 'left outer join datacenters E on E.id=A.datacenter_id '
    sql+= 'left outer join ptps F on F.id=A.ptp_id '
    sql+= 'left outer join cores G on G.id=A.core_id '
    sql+= 'left outer join aps H on H.id=A.ap_id '
    sql+= 'order by A.create_date asc '
=======
getClients = (obj) => {
    sql = 'select id,name,alias,address,fbcount from '
    sql+= '(select a.id,a.name,a.alias, a.address, count(b.nofb)fbcount from clients a '
    sql+= 'left outer join fbs b on b.client_id=a.id '
    sql+= 'where active="1" '
    sql+= 'group by a.id,a.name,a.alias,a.address '
    sql_= 'order by a.name asc '
    sql+= ') A order by '+obj.orderby+' '+obj.ordertype+' '
>>>>>>> 7e01c4d3a2ccdba24f933e313d8813cc260e4bde
    sql+= 'limit '+obj.segment+','+obj.offset+' '
    console.log('GetTickets',sql)
    return sql
},
getTicketsLength = () => {
    sql = 'select count(A.id) cnt '
    sql+= 'from tickets A '
    sql+= 'left outer join clients B on B.id=A.client_site_id '
    sql+= 'left outer join backbones C on C.id=A.backbone_id '
    sql+= 'left outer join btstowers D on D.id=A.btstower_id '
    sql+= 'left outer join datacenters E on E.id=A.datacenter_id '
    sql+= 'left outer join ptps F on F.id=A.ptp_id '
    sql+= 'left outer join cores G on G.id=A.core_id '
    sql+= 'left outer join aps H on H.id=A.ap_id '
    sql+= 'where A.active="1" '
    console.log('GetTicketLength',sql)
    return sql
},
searchTickets = (obj) => {
    sql = 'select A.id,A.clientname,A.kdticket, A.status, '
    sql+= 'case A.status when "0" then "Open" when "1" then "Closed" end humanstatus, '
    sql+= 'case A.requesttype '
    sql+= 'when "pelanggan" then B.address '
    sql+= 'when "backbone" then C.location '
    sql+= 'when "bts" then D.location '
    sql+= 'when "datacenter" then E.location '
    sql+= 'when "ptp" then "-" '
    sql+= 'when "core" then "-" '
    sql+= 'when "ap" then "-" '
    sql+= 'end addr '
    sql+= 'from tickets A '
    sql+= 'left outer join clients B on B.id=A.client_site_id '
    sql+= 'left outer join backbones C on C.id=A.backbone_id '
    sql+= 'left outer join btstowers D on D.id=A.btstower_id '
    sql+= 'left outer join datacenters E on E.id=A.datacenter_id '
    sql+= 'left outer join ptps F on F.id=A.ptp_id '
    sql+= 'left outer join cores G on G.id=A.core_id '
    sql+= 'left outer join aps H on H.id=A.ap_id '
    sql+= 'where A.clientname like "%'+obj.name+'%" '
    sql+= 'order by A.create_date asc '
    sql+= 'limit '+obj.segment+','+obj.offset+' '
    console.log('GetTickets',sql)
    return sql
<<<<<<< HEAD
},
deleteTicket = obj => {
    sql = 'delete from tickets '
    sql+= 'where kdticket="'+obj.kdticket+'" '
    console.log('Remove Ticket',sql)
=======
}
saveClient = obj => {
    sql = 'insert into clients '
    sql+= '() '
    sql+= 'values '
    sql+= '()'
    return sql
}
updateClient = obj => {
    sql = 'update clients '
    sql+= 'set '
    sql+= ''
    sql+= 'where id='+obj.id+' '
}
getFbs = obj => {
    sql = 'select * from fbs '
    sql+= 'where client_id='+obj.client_id+' '
    sql+= 'limit '+obj.pageIndex+', '+obj.pageSize+ ' '
    console.log("getFbs query",sql)
    return sql
}
getFb = obj => {
    sql = 'select * from fbs '
    sql+= 'where nofb = "' + obj.nofb + '" '
    console.log("getFb query",sql)
    return sql
}
getFbCount = (obj) => {
    sql = 'select count(client_id)fbCount from fbs where client_id='+obj.client_id;
    return sql
}
generateFb = obj => {
    sql = 'select case branch_id ';
    sql+= ' when "1" then concat("SBY",date_format(now(),"%Y%m%d"),lpad(a.id,6,"0"),lpad('+obj.fbCount+',3,"0")) ';
    sql+= ' when "2" then concat("JKT",date_format(now(),"%Y%m%d"),lpad(a.id,6,"0"),lpad('+obj.fbCount+',3,"0")) ';
    sql+= ' when "3" then concat("MLG",date_format(now(),"%Y%m%d"),lpad(a.id,6,"0"),lpad('+obj.fbCount+',3,"0")) ';
    sql+= ' when "4" then concat("BLI",date_format(now(),"%Y%m%d"),lpad(a.id,6,"0"),lpad('+obj.fbCount+',3,"0")) ';
    sql+= 'end genfb ';
    sql+= 'from clients a where id='+obj.client_id;
    return sql    
}
saveFb = obj => {
    sql = 'insert into fbs '
    sql+= '(nofb,client_id,name,businesstype,siup,npwp,sppkp,address,city,telp,fax,activationdate,period1,period2,services)'
    sql+= 'values '
    sql+= '("'+obj.nofb+'","'+obj.client_id+'","'+obj.name+'","'+obj.businesstype+'","'+obj.siup+'","'+obj.npwp+'","'+obj.sppkp+'","'+obj.address+'","'+obj.city+'","'+obj.telp+'","'+obj.fax+'","'+obj.activationdate+'","'+obj.period1+'","'+obj.period2+'","'+obj.services+'")'
    return sql
}
updateFb = obj => {
    sql = 'update fbs '
    sql+= 'set '
    sql+= 'nofb="'+obj.nofb+'",client_id="'+obj.client_id+'",'
    sql+= 'name="'+obj.name+'",businesstype="'+obj.businesstype+'",'
    sql+= 'siup="'+obj.siup+'",npwp="'+obj.npwp+'",'
    sql+= 'sppkp="'+obj.sppkp+'",address="'+obj.address+'",'
    sql+= 'city="'+obj.city+'",telp="'+obj.telp+'",fax="'+obj.fax+'",'
    sql+= 'activationdate="'+obj.activationdate+'",period1="'+obj.period1+'",'
    sql+= 'period2="'+obj.period2+'",status="'+obj.status+'",services="'+obj.services+'"'
    sql+= 'where nofb="'+obj.nofb+'"'
    console.log('updateFb query',sql)
    return sql
}
getPics = obj => {
    sql = 'select * from fbpics '
    sql+= 'where nofb = "' + obj.nofb + '" '
    return sql
}
getPic = obj => {
    sql = 'select * from fbpics '
    sql+= 'where nofb = "' + obj.nofb + '" '
    sql+= 'and role = "' + obj.role + '" '
    return sql
}
savePic = obj => {
    sql = 'insert into fbpics '
    sql+= '(name,nofb,role,position,idnum,phone,hp,email)'
    sql+= 'values '
    sql+= '("'+obj.name+'","'
    sql+= obj.nofb+'","'
    sql+= obj.role+'","'
    sql+= obj.position+'","'
    sql+= obj.idnum+'","'
    sql+= obj.phone+'","'
    sql+= obj.hp+'","'
    sql+= obj.email+'")'
    console.log('savepic',sql)
    return sql
}
updatePic = obj => {
    sql = 'update fbpics '
    sql+= 'set '
    sql+= 'nofb="'+obj.nofb+'",name="'+obj.name+'",role="'+obj.role+'",position="'+obj.position+'",idnum="'+obj.idnum+'",phone="'+obj.phone+'",hp="'+obj.hp+'",email="'+obj.email+'" '
    sql+= 'where nofb="'+obj.nofb+'" and role="'+obj.role+'" '
    return sql
}
getServices = obj => {
    sql = 'select * from fbservices '
    sql+= 'where fb_id="' + obj.nofb + '" '
    return sql
}
getService = obj => {
    sql = 'select * from fbservices '
    sql+= 'where id = "' + obj.id + '" '
    return sql
}
saveService = obj => {
    sql = 'insert into fbservices '
    sql+= '(fb_id,category,name,bwtype,upm,upk,upstr,dnm,dnk,dnstr,space,bandwidth,customservice,createuser)'
    sql+= 'values '
    sql+= '("'+obj.fb_id+'","'+obj.category+'","'+obj.name+'","'+obj.bwtype+'","'+obj.upm+'","'+obj.upk+'","'+obj.upstr+'","'+obj.dnm+'","'+obj.dnk+'","'+obj.dnstr+'","'+obj.space+'","'+obj.bandwidth+'","'+obj.customservice+'","'+obj.createuser+'")'
    console.log("Save service Query",sql)
    return sql
}
updateService = obj => {
    sql = 'update fbservices '
    sql+= 'set '
    sql+= 'category="'+obj.category
    sql+= '",name="'+obj.name
    sql+= '",bwtype="'+obj.bwtype
    sql+= '",upm="'+obj.upm
    sql+= '",upk="'+obj.upk
    sql+= '",upstr="'+obj.upstr
    sql+= '",dnm="'+obj.dnm
    sql+= '",dnk="'+obj.dnk
    sql+= '",dnstr="'+obj.dnstr
    sql+= '",space="'+obj.space
    sql+= '",bandwidth="'
    sql+= obj.bandwidth
    sql+= '",customservice="'+obj.customservice+'" '
    sql+= 'where id='+obj.id+' '
    return sql
}
getFees = obj => {
    sql = 'select * from fbfees '
    sql+= 'where nofb="' + obj.nofb + '" '
    return sql
}
getFee = obj => {
    sql = 'select * from fbfees '
    sql+= 'where client_id = "' + obj.client_id + '" '
    sql+= 'and name = "' + obj.name + '" '
    sql+= 'and nofb = "' + obj.nofb + '"'
    return sql
}
saveFee = obj => {
    sql = 'insert into fbfees '
    sql+= '(client_id,name,nofb,dpp,ppn)'
    sql+= 'values '
    sql+= '("'+obj.client_id+'","'+obj.name+'","'+obj.nofb+'","'+obj.dpp+'","'+obj.ppn+'")'
    return sql
}
updateFee = obj => {
    sql = 'update fbfees '
    sql+= 'set '
    sql+= 'client_id="'+obj.client_id+'",name="'+obj.name+'",nofb="'+obj.nofb+'",dpp="'+obj.dpp+'",ppn="'+obj.ppn+'"'
    sql+= 'where client_id="'+obj.client_id+'" '
    sql+= 'and name="'+obj.name+'" '
    sql+= 'and nofb="'+obj.nofb+'"'
    return sql
}
removeFee = obj => {
    sql = 'delete from fbfees '
    sql+= 'where nofb = "' + obj.nofb + '" '
    sql+= 'and name = "' + obj.name + '" '
    return sql
}
login = obj => {
    sql = 'select id,salt1,password1 from users '
    sql+= 'where email="'+obj.email+'" '
    console.log("login query",sql);
    return sql
}
updatePassword = (obj) => {
    sql = 'update users set password1="'+obj.password+'", '
    sql+= 'salt1="'+obj.salt+'" '
    sql+= 'where email = "' + obj.email + '" '
    return sql
}
activateUser = (obj,active) => {
    sql = 'update users set active="'+active+'" '
    sql+= 'where email = "' + obj.email + '" '
    return sql
}
createUser = obj => {
    sql = 'insert into users '
    sql+= '(username,email,password1,salt1,ip_address,created_on) '
    sql+= 'values '
    sql+= '("'+obj.username+'","'+obj.email+'","'+obj.password+'","'+obj.salt+'","127.0.0.1",0)'
    return sql
}
removePic = obj => {
    sql = 'delete from fbpics '
    sql+= 'where role="'+obj.role+'" '
    sql+= 'and nofb="'+obj.nofb+'" '
    sql+= 'and client_id="'+obj.client_id+'" '
    console.log('removepic sql',sql)
    return sql
}
removeFbService = obj => {
    sql = 'delete from fbservices '
    sql+= 'where id='+ obj.id +' '
    console.log(sql)
    return sql
}
removeFB = obj => {
    console.log('OBH',obj)
    sql = 'delete from fbs '
    sql+= 'where nofb="'+obj.nofb+'" '
    console.log(sql)
>>>>>>> 7e01c4d3a2ccdba24f933e313d8813cc260e4bde
    return sql
}
module.exports = {
    deleteTicket : deleteTicket,
    searchTickets : searchTickets,
    getTickets : getTickets,
    getTicketsLength : getTicketsLength
}