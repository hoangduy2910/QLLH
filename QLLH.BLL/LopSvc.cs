using System;
using System.Collections.Generic;
using System.Text;
using QLLH.Common.BLL;
using QLLH.Common.Rsp;
using System.Linq;

namespace QLLH.BLL
{
    using DAL;
    using DAL.Models;
    using Microsoft.EntityFrameworkCore.Internal;
    using QLLH.Common.Req;
    public class LopSvc : GenericSvc<LopRep, Lop>
    {
        public override SingleRsp Read(int id)
        {
            var res = new SingleRsp();
            var m = _rep.Read(id);
            res.Data = m;
            return res;
        }

        public object getLopById(int id)
        {
            var l = All.FirstOrDefault(l => l.MaLop == id);
            return l;
        }

        public object getAllLopNoDetail()
        {
            var listLop = All;
            return listLop;
        }

        public object getAllLop(int page, int size, string keyword)
        {
            var listLop = All.Join(_rep.Context.GiaoVien, a => a.MaLop, b => b.MaLop, (a, b) => new
            {
                a.MaLop,
                a.TenLop,
                MaGv = b.MaGv,
                TenGv = b.TenGv
            }).Where(l => l.MaLop != 1);

            var offset = (page - 1) * size;
            var totalRecord = listLop.Count();
            var totalPage = (totalRecord % size) == 0 ? (int)(totalRecord / size) : (int)((totalRecord / size) + 1);
            var data = listLop.Skip(offset).Take(size).ToList();

            var res = new
            {
                Data = data,
                totalRecord = totalRecord,
                totalPage = totalPage,
                page = page,
                size = size
            };

            return res;
        }
    }
}
