using System;
using System.Collections.Generic;
using System.Text;
using QLLH.Common.DAL;
using System.Linq;

namespace QLLH.DAL
{
    using Models;
    using QLLH.Common.Rsp;
    public class HocSinhRep : GenericRep<QuanLyLopHocContext, HocSinh>
    {
        public override HocSinh Read(int id)
        {
            // return base.Read(id);
            var res = All.FirstOrDefault(x => x.MaHs == id);
            return res;
        }

        public int Remove(int id)
        {
            var m = All.First(x => x.MaHs == id);
            m = Delete(m);
            return m.MaHs;
        }

        public SingleRsp CreateHocSinh(HocSinh hs)
        {
            var res = new SingleRsp();
            using (var context = new QuanLyLopHocContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var newHS = context.HocSinh.Add(hs);
                        context.SaveChanges();
                        tran.Commit();
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        res.SetError(ex.StackTrace);
                    }
                }
            }
            return res;
        }

        public SingleRsp UpdateHocSinh(HocSinh hs)
        {
            var res = new SingleRsp();
            using (var context = new QuanLyLopHocContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var newHS = context.HocSinh.Update(hs);
                        context.SaveChanges();
                        tran.Commit();
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        res.SetError(ex.StackTrace);
                    }
                }
            }
            return res;
        }

        public SingleRsp RemoveHocSinh(HocSinh hs)
        {
            var res = new SingleRsp();
            using (var context = new QuanLyLopHocContext())
            {
                using (var tran = context.Database.BeginTransaction())
                {
                    try
                    {
                        var newHS = context.HocSinh.Remove(hs);
                        context.SaveChanges();
                        tran.Commit();
                    }
                    catch (Exception ex)
                    {
                        tran.Rollback();
                        res.SetError(ex.StackTrace);
                    }
                }
            }
            return res;
        }
    }
}
