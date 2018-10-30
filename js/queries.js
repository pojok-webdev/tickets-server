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
},
deleteTicket = obj => {
    sql = 'delete from tickets '
    sql+= 'where kdticket="'+obj.kdticket+'" '
    console.log('Remove Ticket',sql)
    return sql
}
module.exports = {
    deleteTicket : deleteTicket,
    searchTickets : searchTickets,
    getTickets : getTickets,
    getTicketsLength : getTicketsLength
}